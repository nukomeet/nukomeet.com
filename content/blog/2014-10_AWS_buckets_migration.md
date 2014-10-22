---
created_at: 2014-10-21
kind: article
publish: true
title: "Data migration between two Amazon S3 buckets on different accounts"
authors:
- tukan
tags:
- amazon
---

Recently we needed to migrate data between two Amazon S3 buckets on different accounts. Situation seemed simple but while diving into topic we didn't find good documentation how to accomplish this. We tried few solutions but result one was that we had migrated data between buckets without proper rights on files so we couldn't do much with migrated data.
 
Solution is to add proper policies on destination bucket and use `sync` on source bucket via AWS CLI. Here's how we did it in 2 steps:

1. Create policy on destination bucket.
  Source bucket user needs to have access to destination bucket. You need to know source bucket account ID and source bucket user name (for user name you may use `root` if you don't want to use specific user).
  
  
  ```
  {
    "Id": "Policy1357935677554",
      "Statement": 
        [
          {
            "Sid": "Stmt1357935647218",
            "Action": "s3:*",
            "Effect": "Allow",
            "Resource": 
              [
                "arn:aws:s3:::destination-bucket-here",
                "arn:aws:s3:::destination-bucket-here/*"
              ],
            "Principal": 
              {
                "AWS": "arn:aws:iam::account-number-here:user-name-here"
              }
          }
        ]
  }
  ```
2. Synchronise buckets via AWS CLI
  Make sure you have AWS CLI installed and set up with source bucket user credentials. Then you're ready to use `sync`.
  > A sync command makes it easy to synchronise the contents of a local folder with a copy in a S3 bucket.
  
  In our case we'll synchronise two S3 buckets on different accounts with acl set to public-read.
  
  > Amazon S3 Access Control Lists (ACLs) enable you to manage access to buckets and objects. Each bucket and object has an ACL attached to it as a subresource. It defines which AWS accounts or groups are granted access and the type of access. When a request is received against a resource, Amazon S3 checks the corresponding ACL to verify the requester has the necessary access permissions.
  
  ```
  aws s3 sync s3://source-bucket-name s3://destination-bucket-name --acl public-read
  ```
  In case you may need different parameters have a look at [sync](http://docs.aws.amazon.com/cli/latest/reference/s3/sync.html) in AWS reference.