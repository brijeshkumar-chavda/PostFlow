-- SQL Server (T-SQL) Schema for CrossPlatformPostApp (.NET Backend)

-- 1. Users Table
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(255) NOT NULL UNIQUE,
   Rahter than opening the two pop. 
one is generate image and then try again and use assets.
why can you just show one single pop that show left side image and right side option like the 

1. discription box
2. re-generate the image 
3. save

so user has freedom and easy of acess to type the discription agian and generate the image and also re-generate button is there with save button  Name NVARCHAR(255) NOT NULL,
    PasswordHash NVARCHAR(MAX) NOT NULL, -- Store hashed passwords
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- 2. SocialAccounts Table
CREATE TABLE SocialAccounts (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Platform NVARCHAR(50) NOT NULL CHECK (Platform IN ('linkedin', 'instagram', 'twitter')),
    PlatformUserId NVARCHAR(255) NOT NULL,
    AccessToken NVARCHAR(MAX) NOT NULL,
    RefreshToken NVARCHAR(MAX),
    ExpiresAt DATETIME2,
    ConnectedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- 3. Posts Table
CREATE TABLE Posts (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Content NVARCHAR(MAX), -- Supports HTML
    Status NVARCHAR(50) NOT NULL CHECK (Status IN ('draft', 'scheduled', 'published')) DEFAULT 'draft',
    ScheduledTime DATETIME2,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- 4. PostTargets Table (One post, multiple destinations)
CREATE TABLE PostTargets (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    PostId INT NOT NULL,
    SocialAccountId INT NOT NULL,
    Status NVARCHAR(50) NOT NULL CHECK (Status IN ('pending', 'success', 'failed')) DEFAULT 'pending',
    ExternalPostId NVARCHAR(255),
    ErrorMessage NVARCHAR(MAX),
    FOREIGN KEY (PostId) REFERENCES Posts(Id) ON DELETE CASCADE,
    FOREIGN KEY (SocialAccountId) REFERENCES SocialAccounts(Id) -- No cascade to preserve history if account removed
);

-- 5. MediaAssets Table
CREATE TABLE MediaAssets (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    PostId INT, -- Optional, can be NULL if not yet attached to a post
    Url NVARCHAR(MAX) NOT NULL,
    Type NVARCHAR(50) NOT NULL CHECK (Type IN ('image', 'video')),
    Filename NVARCHAR(255),
    SizeBytes BIGINT,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION, -- Prevent cycles
    FOREIGN KEY (PostId) REFERENCES Posts(Id) ON DELETE SET NULL
);



-- Indexes for performance
CREATE INDEX IX_SocialAccounts_UserId ON SocialAccounts(UserId);
CREATE INDEX IX_Posts_UserId ON Posts(UserId);
CREATE INDEX IX_PostTargets_PostId ON PostTargets(PostId);
CREATE INDEX IX_MediaAssets_UserId ON MediaAssets(UserId);
