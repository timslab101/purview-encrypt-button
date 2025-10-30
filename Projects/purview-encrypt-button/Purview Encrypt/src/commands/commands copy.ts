const HEADER_KEY = "X-Purview-Encrypt";
const HEADER_VALUE = "true";

/**
 * Add Purview header safely on button click
 */
export async function addHeader(event: Office.AddinCommands.Event): Promise<void> {
  try {
    console.log("addHeader: waiting for Office.onReady...");
    await Office.onReady();

    const item = Office.context.mailbox?.item;
    if (!item) {
      console.error("addHeader: mailbox item not available");
      event.completed();
      return;
    }

    const headers: Record<string, string> = { [HEADER_KEY]: HEADER_VALUE };

    const result = await new Promise<Office.AsyncResult<void>>((resolve) => {
      item.internetHeaders.setAsync(headers, (asyncResult) => resolve(asyncResult));
    });

    if (result.status === Office.AsyncResultStatus.Succeeded) {
      console.log("addHeader: header added successfully", headers);
      item.notificationMessages.addAsync("purviewAdded", {
        type: "informationalMessage",
        message: "Purview encryption header added.",
        icon: "icon16",
        persistent: false,
      });
    } else {
      console.error("addHeader: setAsync failed", result.error);
      item.notificationMessages.addAsync("purviewFailed", {
        type: "errorMessage",
        message: "Failed to add Purview header. See console.",
        persistent: false,
      });
    }
  } catch (ex) {
    console.error("addHeader: unexpected error", ex);
    try {
      Office.context.mailbox.item.notificationMessages.addAsync("purviewException", {
        type: "errorMessage",
        message: "Unexpected error adding header.",
        persistent: false,
      });
    } catch (_) {}
  } finally {
    event.completed();
    console.log("addHeader: event.completed() called");
  }
}
