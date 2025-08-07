
CREATE TABLE wp_user_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    token TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    expires_at DATETIME NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    INDEX (user_id),
    FOREIGN KEY (user_id) REFERENCES wp_users(ID) ON DELETE CASCADE
);
