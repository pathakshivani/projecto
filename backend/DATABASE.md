# This file contains sql queries for setup database and creating tables according to the project

### Note: We are using MySQL database for this project

## Step-1: Create a database

```sql
CREATE DATABASE pms;
```

## Step-2: Create master tables

```sql
CREATE TABLE pms.roles (
    id VARCHAR(50) NOT NULL,
    role_name VARCHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE pms.task_statuses (
    id VARCHAR(50) NOT NULL,
    status_name VARCHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE pms.project_statuses (
    id VARCHAR(50) NOT NULL,
    status_name VARCHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE pms.priorities (
    id VARCHAR(50) NOT NULL,
    priority_name VARCHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY(id)
);
```

## Step-3: Create all functional tables required in this project

```sql
CREATE TABLE pms.users (
    id VARCHAR(50) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    profile VARCHAR(255) DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    role_id VARCHAR(50) NOT NULL,
    is_email_verified BOOLEAN DEFAULT FALSE,
    refresh_token VARCHAR(255) DEFAULT NULL,
    forgot_password_token VARCHAR(255) DEFAULT NULL,
    forgot_password_expiry TIMESTAMP(6) DEFAULT NULL,
    email_verification_token VARCHAR(255) DEFAULT NULL,
    email_verification_expiry TIMESTAMP(6) DEFAULT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES roles (id) ON DELETE CASCADE
);

CREATE INDEX idx_token
ON pms.users (forgot_password_token, email_verification_token);

CREATE TABLE pms.projects (
    id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    status_id VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(status_id) REFERENCES project_statuses (id) ON DELETE CASCADE
);

CREATE TABLE pms.tasks (
    id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    project_id VARCHAR(50) NOT NULL,
    status_id VARCHAR(50) NOT NULL,
    priority_id VARCHAR(50) NOT NULL,
    due_date DATE NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(project_id) REFERENCES projects (id) ON DELETE CASCADE,
    FOREIGN KEY(status_id) REFERENCES task_statuses (id) ON DELETE CASCADE,
    FOREIGN KEY(priority_id) REFERENCES priorities (id) ON DELETE CASCADE
);

CREATE TABLE pms.user_projects (
    id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    project_id VARCHAR(50) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY(project_id) REFERENCES projects (id) ON DELETE CASCADE
);

CREATE TABLE pms.task_assignees (
    id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    task_id VARCHAR(50) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY(task_id) REFERENCES tasks (id) ON DELETE CASCADE
);

CREATE TABLE pms.documents (
    id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    project_id VARCHAR(50) NOT NULL,
    file_path VARCHAR(255) DEFAULT NULL,
    uploaded_by VARCHAR(50) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(project_id) REFERENCES projects (id) ON DELETE CASCADE,
    FOREIGN KEY(uploaded_by) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE pms.meeting_minutes (
    id VARCHAR(50) NOT NULL,
    project_id VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    attendees TEXT NOT NULL,
    notes TEXT NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(project_id) REFERENCES projects (id) ON DELETE CASCADE,
    FOREIGN KEY(created_by) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE pms.logs (
    id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    action TEXT NOT NULL,
    time TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE pms.notifications (
    id VARCHAR(50) NOT NULL,
    user_id VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('UNREAD', 'READ') DEFAULT 'UNREAD',
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE pms.reports (
    id VARCHAR(50) NOT NULL,
    project_id VARCHAR(50) NOT NULL,
    generated_by VARCHAR(50) NOT NULL,
    report_type VARCHAR(100) NOT NULL,
    data TEXT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(project_id) REFERENCES projects (id) ON DELETE CASCADE,
    FOREIGN KEY(generated_by) REFERENCES users (id) ON DELETE CASCADE
);
```
