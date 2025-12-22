# Database Schema Design (.NET Backend)

This schema is designed for a **.NET 8 Web API** backend using **Entity Framework Core** and **SQL Server**. It covers all frontend features (Commander, Calendar, Analytics, Accounts).

## Core Entities

### 1. Users

Stores application users.

| Column          | Type       | Description                                         |
| :-------------- | :--------- | :-------------------------------------------------- |
| `id`            | UUID / INT | Primary Key                                         |
| `email`         | VARCHAR    | Unique email address                                |
| `name`          | VARCHAR    | Full name                                           |
| `password_hash` | VARCHAR    | For simple auth (or use Provider ID if using OAuth) |
| `created_at`    | TIMESTAMP  | Account creation date                               |

### 2. SocialAccounts

Stores connected social media accounts (LinkedIn, Instagram) for each user.

| Column             | Type                                     | Description                             |
| :----------------- | :--------------------------------------- | :-------------------------------------- |
| `id`               | UUID / INT                               | Primary Key                             |
| `user_id`          | FK -> Users.id                           | Owner of the account                    |
| `platform`         | ENUM('linkedin', 'instagram', 'twitter') | Platform name                           |
| `platform_user_id` | VARCHAR                                  | ID of the user on the external platform |
| `access_token`     | VARCHAR                                  | OAuth access token                      |
| `refresh_token`    | VARCHAR                                  | OAuth refresh token                     |
| `expires_at`       | TIMESTAMP                                | Token expiration                        |
| `connected_at`     | TIMESTAMP                                | When the account was linked             |

### 3. Posts

Stores post content created in the Composer.

| Column           | Type                                    | Description                                       |
| :--------------- | :-------------------------------------- | :------------------------------------------------ |
| `id`             | UUID / INT                              | Primary Key                                       |
| `user_id`        | FK -> Users.id                          | Author                                            |
| `content`        | TEXT                                    | The post caption/text (supports HTML from Tiptap) |
| `status`         | ENUM('draft', 'scheduled', 'published') | Current state                                     |
| `scheduled_time` | TIMESTAMP                               | If status is 'scheduled'                          |
| `created_at`     | TIMESTAMP                               | Creation time                                     |
| `updated_at`     | TIMESTAMP                               | Last edit time                                    |

### 4. PostTargets

Links a Post to specific platforms (e.g., a post meant for both LinkedIn and Instagram).

| Column              | Type                                 | Description                                           |
| :------------------ | :----------------------------------- | :---------------------------------------------------- |
| `id`                | UUID / INT                           | Primary Key                                           |
| `post_id`           | FK -> Posts.id                       | The parent post                                       |
| `social_account_id` | FK -> SocialAccounts.id              | The account to publish to                             |
| `status`            | ENUM('pending', 'success', 'failed') | Publishing status for this specific platform          |
| `external_post_id`  | VARCHAR                              | ID of the published post on the platform (if success) |
| `error_message`     | TEXT                                 | If failed                                             |

### 5. MediaAssets

Stores images and videos used in posts.

| Column       | Type                   | Description                             |
| :----------- | :--------------------- | :-------------------------------------- |
| `id`         | UUID / INT             | Primary Key                             |
| `user_id`    | FK -> Users.id         | Uploader                                |
| `post_id`    | FK -> Posts.id         | (Optional) Associated post              |
| `url`        | VARCHAR                | URL to file storage (S3/Cloudinary/etc) |
| `type`       | ENUM('image', 'video') | Media type                              |
| `filename`   | VARCHAR                | Original filename                       |
| `size_bytes` | INT                    | File size                               |
| `created_at` | TIMESTAMP              | Upload time                             |

### 6. Analytics

Stores performance metrics for published posts.

| Column           | Type                 | Description                         |
| :--------------- | :------------------- | :---------------------------------- |
| `id`             | UUID / INT           | Primary Key                         |
| `post_target_id` | FK -> PostTargets.id | The usage of the post being tracked |
| `impressions`    | INT                  | View count                          |
| `likes`          | INT                  | Like count                          |
| `comments`       | INT                  | Comment count                       |
| `shares`         | INT                  | Share/Repost count                  |
| `fetched_at`     | TIMESTAMP            | When this data was last updated     |

## Relationships

- A **User** has many **SocialAccounts**.
- A **User** has many **Posts**.
- A **Post** has many **PostTargets** (one for each platform selected).
- A **Post** has many **MediaAssets**.
- A **PostTarget** has many **Analytics** entries (historical data) or one current entry.
