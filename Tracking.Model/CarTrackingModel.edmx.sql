
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, and Azure
-- --------------------------------------------------
-- Date Created: 06/03/2014 13:47:30
-- Generated from EDMX file: D:\Data_Anupong\Projects\CarTracking\Tracking.Model\CarTrackingModel.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [CarTracking];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[GeoPoints]', 'U') IS NOT NULL
    DROP TABLE [dbo].[GeoPoints];
GO
IF OBJECT_ID(N'[dbo].[Pins]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Pins];
GO
IF OBJECT_ID(N'[dbo].[Vehicles]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Vehicles];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'GeoPoints'
CREATE TABLE [dbo].[GeoPoints] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [DeviceSn] nvarchar(max)  NOT NULL,
    [Latitude] decimal(18,7)  NOT NULL,
    [Heading] int  NOT NULL,
    [VehicleId] int  NOT NULL,
    [GeopointId] int  NULL,
    [Longitude] decimal(18,7)  NOT NULL
);
GO

-- Creating table 'Pins'
CREATE TABLE [dbo].[Pins] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [PinName] varchar(30)  NOT NULL,
    [Latitude] decimal(18,7)  NOT NULL,
    [Longitude] decimal(18,7)  NOT NULL,
    [CreatedDate] datetime  NOT NULL
);
GO

-- Creating table 'Vehicles'
CREATE TABLE [dbo].[Vehicles] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [LicensePlate] varchar(20)  NOT NULL,
    [Latitude] decimal(18,6)  NOT NULL,
    [DeviceSn] varchar(50)  NOT NULL,
    [Longitude] decimal(18,6)  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'GeoPoints'
ALTER TABLE [dbo].[GeoPoints]
ADD CONSTRAINT [PK_GeoPoints]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Pins'
ALTER TABLE [dbo].[Pins]
ADD CONSTRAINT [PK_Pins]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Vehicles'
ALTER TABLE [dbo].[Vehicles]
ADD CONSTRAINT [PK_Vehicles]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [VehicleId] in table 'GeoPoints'
ALTER TABLE [dbo].[GeoPoints]
ADD CONSTRAINT [FK_VehicleGeoPoint]
    FOREIGN KEY ([VehicleId])
    REFERENCES [dbo].[Vehicles]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_VehicleGeoPoint'
CREATE INDEX [IX_FK_VehicleGeoPoint]
ON [dbo].[GeoPoints]
    ([VehicleId]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------