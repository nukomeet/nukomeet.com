---
created_at: 2015-03-02
kind: article
publish: true
title: "How to transfer your domain to NameCheap"
authors:
- tukan
- kasia
tags:

extract: Domain transfer can be intimidating and cumbersome operation. In this article we will show you how to facilitate that process and migrate your domain to an excellent Los Angeles based Namecheap.
---

**Switching DNS**

Switching domain provider means that it’s highly probable you’re also switching DNS system. It depends on which DNS you are using for your domain. If your domain is using a custom (hosting) DNS system, there should not be any downtime during transfer. If your to-be-transferred domain is using the default DNS system/nameservers of the old registrar, it will no longer resolve domain once the transfer is completed. In the latter case to obtain zero downtime switch you need to setup FreeDNS (link - https://www.namecheap.com/domains/freedns.aspx) (or similar service) before you start procedure of transfer.

Here's how it works instruction taken from FreeDNS help (link  - https://www.namecheap.com/support/knowledgebase/article.aspx/582/8/).

Enroll the domain (example.com) to use our FreeDNS service and explicitly authorize your domain to use our FreeDNS service.
Copy all your domain settings (host records, email settings etc) to our control panel.
At the other registrar (OldRegistrar), point your domain to use our FreeDNS name servers as well. For information on how to setup custom DNS at your current registrar (ex: OldRegistrar), please check the OldRegistrar's FAQ documentation.
Wait until the DNS settings for the domain are propagated, and then transfer your domain to Namecheap using the normal transfer process.

In short you need to setup FreeDNS for your domain which also means you’ll need to authorize via email. FreeDNS will send authorization email to account specified during FreeDNS setup. This email account have to be created for domain you are transfering eg. webmaster@example.com.

**Obtaining authorization code**

You need to obtain authorization code from your current domain provider. Naming of auth code may differ among providers but most probable are EEP or EPP or AuthInfo. Each provider may have different steps to provide authorization code, you should read about it in your’s provider help. In some cases you’ll need to fill some papers in order to obtain it in others it’s just a matter of click on the button in your domain provider management panel.

**Transfer process**

Start domain transfer process. This means you should initiate transfer process on your new domain provider. Probably you will need to pay normal plan fee to your new provider for domain and create account in new provider if yet you don’t have it. In next steps you should be able to fill in code obtained from old provider on new provider’s webpage / web interface domain transfer form. From now you should check your email account and/or web interfaces of old and new provider to ensure of process is going flawlessly. Your old and new providers may send you more emails asking for authorization of transfer process.

Process of domain transfer may take some time usually few days.

Important tip: in some cases it may be needed to call your old domain provider to make transfer happen. Even though you have obtained authorization code to do it, your domain may be still locked by old provider.