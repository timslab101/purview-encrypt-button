/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global Office */

Office.onReady(() => {
    // If needed, Office.onReady() is a good place to initialize things
    console.log('Office Add-in ready');
});

/**
 * Inserts the Purview encryption header into the email
 * @param {Office.AddinCommands.Event} event
 */
function insertPurviewHeader(event) {
    // Get the item being composed
    const item = Office.context.mailbox.item;

    // Check if we're in compose mode
    if (!item.internetHeaders) {
        showNotification("Error", "This feature is only available when composing messages.");
        event.completed();
        return;
    }

    // Set the custom internet header
    item.internetHeaders.setAsync(
        { "x-purviewencrypt": "encryptyes" },
        function (asyncResult) {
            if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
                showNotification("Success", "Purview encryption header added successfully!");
            } else {
                showNotification("Error", "Failed to add header: " + asyncResult.error.message);
            }

            // Signal that the function is complete
            event.completed();
        }
    );
}

/**
 * Shows a notification message to the user
 * @param {string} title - The title of the notification
 * @param {string} message - The message content
 */
function showNotification(title, message) {
    // Check if notification API is available
    if (Office.context.mailbox.item.notificationMessages) {
        Office.context.mailbox.item.notificationMessages.replaceAsync(
            "purview-encrypt-notification",
            {
                type: "informationalMessage",
                message: message,
                icon: "Icon.16x16",
                persistent: false
            }
        );
    } else {
        // Fallback for older Outlook versions
        console.log(title + ": " + message);
    }
}

// Register the function with Office
if (typeof Office !== 'undefined' && Office.actions) {
    Office.actions.associate("insertPurviewHeader", insertPurviewHeader);
}