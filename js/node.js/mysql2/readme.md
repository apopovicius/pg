# MySQL2 + Express module

> https://www.youtube.com/watch?v=344Zv2m9TYI&ab_channel=TheFullStackJunkie

Use _config/postman_queries.json_ to send client request to our nodejs server.
Also you need to install mysql on your local machine

## DB structure

| Field    | Type         | Null |   Key   | Default | Extra     |
| -------- | ------------ | :--: | :-----: | :-----: | --------- |
| id       | int          |  NO  | PRIMARY |  null   | auto_incr |
| task     | varchar(255) | YES  |         |  null   |           |
| created  | datetime     | YES  |         |  null   |           |
| priority | int          | YES  |         |    1    |           |
