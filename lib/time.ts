import { headers } from "next/headers";

/**
 * Returns the current time in milliseconds if called from a request context and TEST_MODE is enabled.
 * If called outside of a request context, it will log a warning and return the current time.
 */
export async function getEffectiveTime(): Promise<Date> {
  try {
    const headersList = await headers();
    const testMode = process.env.TEST_MODE === "1";

    if (testMode) {
      const testNowHeader = headersList.get("x-test-now-ms");

      if (testNowHeader) {
        // Parse the milliseconds from the header
        const timestamp = parseInt(testNowHeader, 10);

        // Return valid date only if the timestamp is valid
        if (!isNaN(timestamp)) {
          return new Date(timestamp);
        }
      }
    }
  } catch (error) {
    console.warn(
      "Warning: getEffectiveTime called outside request context",
      error
    );
  }

  return new Date();
}
