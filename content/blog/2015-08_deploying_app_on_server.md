---
created_at: 2015-08-28
kind: article
publish: true
title: "Deploying app on server"
authors:
- kasia_kasprzak
- kasia
tags:
- technology

extract: I have been accepted to internship in Nukomeet. My task will be to assist in creating application written in Ruby on Rails. I'll post weekly updates about my tasks and about what I learned each week.
---

Last week I received task to deploy app on server. I have to mention that app is developed from two weeks and it's time to prepare some production environment. I received access to the virtual machine and some information about the solutions used in deploying apps on server. Now lets just connect it all together and it should work.

Assume we have address IP and username as below:

```
User: kate
ADDRESS_IP: 111.1.111.111
```

Connect to a server
---
We have to make sure that we have access to server so we run command:

```
$ ssh kate@111.1.111.111
The authenticity of host ‘111.1.111.111  (111.1.111.111 )’ can't be established.
RSA key fingerprint is 2a:2a:aa:22:22:aa:a2:a2:22:a2:a2:a2:22:2a:2a:2a.
Are you sure you want to continue connecting (yes/no)?
Yes
Warning: Permanently added ‘111.1.111.111  (RSA) to the list of known hosts.
Welcome to Ubuntu 14.04.3 LTS (GNU/Linux 3.13.0-61-generic x86_64)
* Documentation:  https://help.ubuntu.com/
Last login: … from …
kate@number_of_virtual_maschine:~$
```
We’re in.

Install ‘mina’ gem and prepare deployment script
---

We’ll use mina gem to deploy the app. So firstly we add the gem in Gemfile:

```
gem ‘mina’
```

And run command ‘bundle install’.
The next step is prepare deployment script with configuration. Let’s assume our organisation name on Github is super_organisation and our application is super_organisation/super_app.

```
require 'mina/bundler'
require 'mina/rails'
require 'mina/git'

set :app, 'super_app'
set :user, 'kate'
set :domain, ‘111.1.111.111’
set :deploy_to, "/home/#{user}/app
set :repository, “#{app}:super_organisation /#{app}"
set :branch, 'master'

# Manually create these paths in shared/ (eg: shared/config/database.yml) in your server.
# They will be linked in the 'deploy:link_shared_paths' step

set :shared_paths, ['config/database.yml', 'log', 'tmp']
task :environment do
 queue %{
	echo "-----> Setting RAILS_ROOT"
	#{echo_cmd %{export RAILS_ROOT=#{deploy_to}}}
 }
end

# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.

task :setup => :environment do
 queue! %[mkdir -p "#{deploy_to}/shared/log"]
 queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/log"]
 queue! %[mkdir -p "#{deploy_to}/shared/config"]
 queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/config"]
 queue! %[mkdir -p "#{deploy_to}/shared/tmp"]
 queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/tmp"]
 queue! %[touch "#{deploy_to}/shared/config/database.yml"]
 queue  %[echo -----> Be sure to edit 'shared/config/database.yml'.]
 queue! %[touch "#{deploy_to}/shared/config/env"]
 queue  %[echo -----> Be sure to put environment vars 'shared/config/env'.]
end

task :nginx => :environment do
 queue %{
	echo "-----> Setting RAILS_ROOT"
	#{echo_cmd %{export RAILS_ROOT=#{deploy_to}}}
 }
 queue! %[sudo ln -nfs "#{deploy_to}/current/config/nginx.conf" "/etc/nginx/sites-enabled/#{app}"]
 queue %[echo "Linking... #{deploy_to}/current/config/nginx.conf /etc/nginx/sites-enabled/#{app}"]
end

task vars: :environment do
 queue! %[. "#{deploy_to}/shared/config/env"]
end
desc "Deploys the current version to the server."

task deploy: :vars do
 deploy do
	invoke :'git:clone'
	invoke :'deploy:link_shared_paths'
	invoke :'bundle:install'
	invoke :'rails:db_migrate'
	invoke :'rails:assets_precompile'
	to :launch do
 	invoke :restart
	end
 end
end

task restart: :vars do
 queue "touch #{deploy_to}/shared/tmp/restart.txt"
end
```

Make sure that on server we have  directory with name ‘kate’.
Now we have to save this information in file ‘deploy.rb’ and place it in directory config.

Now we can go to Terminal and run command

```
$ mina setup
-----> Creating folders... done.
```

The next step is command mina deploy, but unfortunately we receive error.

```
$ mina deploy
Cloning the Git repository
  	Cloning into bare repository '/home/user/app...’
  	ssh: Could not resolve hostname makesense: Name or service not known
  	fatal: Could not read from remote repository.
  	Please make sure you have the correct access rights
  	and the repository exists.
!     ERROR: Deploy failed.
```

Assign permissions on Github
---
So we need to assign appropriate permissions. We go to the server, log in as the first time

```
$ ssh kate@111.1.111.111.
Welcome to Ubuntu 14.04.3 LTS (GNU/Linux 3.13.0-61-generic x86_64)
* Documentation:  https://help.ubuntu.com/
Last login: … from …
kate@host_name:~$
```

Now we run command:

```
kate@0101:~$ ssh-keygen -t rsa -C “super_app@kate”
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/you/.ssh/id_rsa): super_app
```

Check if you have files super_app and super_app.pub in directory .ssh.
Now we have to adjust .ssh/config and define your named server.
But on server is not so easy change something in file. Here we don't have a 'sublime' or textmate. We have to use for example vim, vi or nano. I chose vi.

```
kate@0101:~$ vi .ssh/config
```
Press ‘i’ to editing file like below:

```
Host super_app
 Hostname github.com
 User git
 IdentityFile ~/.ssh/super_app
```

Press ‘esc’ to stop editing. And :wq to quit the file.
Now we’re opening super_app.pub (is in the same directory so just run vi super_app.pub) We’ll see ssh key. We have to copy that.
On Github account our organization (In my case is that super_organisation) we’re going to Settings -> Deploy Keys. Here we have to click Add deploy key and paste the content of super_app.pub.
Problem with cloning repository is resolved but We have to take next steps to pass command mina deploy.

Prepare server to rails app
---
1.Install bundler :

```
kate@0101:~$ sudo gem install bundler
```

2.Create database.

While the first part is simple and does not cause problems when creating a database we need a little toil.
If we run command mina deploy in our local repository after installing bundler on server we receive:

```
PG::ConnectionBad: FATAL:  Peer authentication failed for user "app".
```

Firstly we have to check if we have prepared user in postgres.

```
kate@0101:~$ sudo -u postgres psql postgres
psql (9.4.4)
Type "help" for help.
postgres=#
postgres=#  \du
                   List of roles
Role name   |      Attributes              | Member of
------------+------------------------------+-----------
app   	  |                              | {}
postgres    | Superuser, Create role,      | {}
               Create DB, Replication
```
Ok, We have besides superuser, user: app. Now we have to create database.yml file (in shared/config) and push some data inside.
Let’s assume our database name is . super_app_database and password is pass.

```
production:
 adapter: postgresql
 encoding: unicode
 database: super_app_database
 host: localhost
 pool: 5
 username: app
 password: pass
 template: template0
```

Now, try if we can go to postgres using those credentials.

```
kate@0101:~$ psql -h localhost -d super_app_database  -U  app –W
(Enter the password ‘pass’)
psql (9.4.4)
SSL connection (protocol: TLSv1.2, cipher: ECDHE-RSA-AES256-GCM-SHA384, bits: 256, compression: off)
Type "help" for help.
app=>
```

Managed to! Now we’re comming back to our local repository and running command

```
$ mina deploy
```

Again success.

Switch on Unix domain socket
---

Using host as localhost we’re using TCP/IP loopback. To receive better efficiency we have to switch on Unix domain socket.
To do this, we have to:

1.Remove this line from database.yml, because when we specify localhost, PostgreSQL will use TCP/IP loopback.

```
host: localhost
```

2.Log in to postgres

```
kate@0101:~/app/current$ sudo -u postgres psql postgres
```


3.Add to user privileges to create database:

```
kate@0101:~/app/current$ postgres=# ALTER USER app CREATEDB;
ALTER ROLE
postgres=# \du
                    List of roles
Role name   |     Attributes           | Member of
------------+--------------------------+-----------
app   	  |          	Create DB   | {}
postgres    | Superuser, Create role,  | {}
             Create DB, Replication
```

4.Now we can go out from postgres and set up our database by running commands on server.

```
kate@0101:~/app/current$ sudo RAILS_ENV=production rake db:drop
kate@0101:~/app/current$ sudo RAILS_ENV=production rake db:create
```
Our app is on server.


