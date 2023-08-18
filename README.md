# Week 9 Assignment Backend Implementation - Full-Stack Engineering

This is assigment in week 9 focus about Backend Implementation - NodeJs, MYSQL, Redis.

- Create table in MySQL Database.
- Connect NodeJS to MYSQL RDMBS to perform CRUD operations.
- (Advance Assigment)

If you want to follow me on social media, you can directly click the link below.

[![LinkedIn Badge](https://img.shields.io/badge/-Reynaldo_Fang-blue?style=flat&logo=linkedin)](https://www.linkedin.com/in/reynaldo-fang/)
[![Instagram Badge](https://img.shields.io/badge/-reynaldo.fang-white?style=flat&logo=instagram&logoColor=black&color=%2387ceeb)](https://www.instagram.com/reynaldo.fang/)
[![Gmail Badge](https://img.shields.io/badge/-reynaldofang02%40gmail.com-black?style=flat&logo=gmail&color=%23454c53)](mailto:reynaldofang02@gmail.com)

### Deploy Link

You can hit back-end API here

[https://week9-reynaldofang.cyclic.cloud ](https://week9-reynaldofang.cyclic.cloud)

| Name                         | HTTP Method | Endpoint                                                                       | Requirements                                                                                        |
| ---------------------------- | ----------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| **All List User**            | `GET`       | `/users`                               |
| **User By ID**     | `GET`       | `/users/:id`                  | Request Params: `id: number`
| **All List Transaction**          | `GET`       | `/transactions`                 |                                                                        |
| **Create New Transaction**       | `POST`      | `/transactions`                  | Request Body: `user_id: number, type: string, amount: number`                                       |
| **Update Transaction by ID** | `PUT`       | `/transactions/:id`| Request Params: `id: number` <br> <br>Request Body: `user_id: number, type: string, amount: number` |
| **Delete Transaction by ID** | `DELETE`    | `/transactions/:id`            | Request Params: `id: number`                                                                        |
| **Get Transaction by User** | `GET`    | `/transactions/user/:userId`            | Request Params: `userId: number`                                                                        |
