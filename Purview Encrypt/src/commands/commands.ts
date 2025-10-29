/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// src/commands/commands.ts

/* global Office, console */

export async function addHeader(event: Office.AddinCommands.Event) {
  try {
    await new Promise<void>((resolve, reject) => {
      Office.context.mailbox.item.internetHeaders.setAsync(
        { "X-Purview-Encrypt": "true" },
        (result) => {
          if (result.status === Office.AsyncResultStatus.Succeeded) {
            Office.context.mailbox.item.notificationMessages.addAsync("encryptHeaderAdded", {
              type: "informationalMessage",
              message: "Purview encryption header added.",
              icon: "icon16",
              persistent: false
            });
            resolve();
          } else {
            console.error(result.error);
            reject(result.error);
          }
        }
      );
    });
  } catch (err) {
    console.error("Failed to add header:", err);
  } finally {
    event.completed();
  }
}
