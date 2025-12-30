import devicesData from "@/data/devices.json";
import categoriesData from "@/data/categories.json";
import type { Device, Category } from "@/types";

// Simulate network delay to demonstrate loading states
async function simulateDelay(ms: number = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Optionally simulate random errors for testing error states
async function maybeSimulateError(errorRate: number = 0): Promise<void> {
  if (Math.random() < errorRate) {
    throw new Error("Simulated network error");
  }
}

/**
 * Fetch all devices from the catalog
 */
export async function getDevices() {
  await simulateDelay(400);
  await maybeSimulateError(0); // Set to 0.1 for 10% error rate during testing
  return devicesData as Device[];
}

/**
 * Fetch all categories
 */
export async function getCategories() {
  await simulateDelay(200);
  await maybeSimulateError(0); // Set to 0.1 for 10% error rate during testing
  return categoriesData as Category[];
}

/**
 * Fetch a single device by ID
 */
export async function getDeviceById(id: string) {
  await simulateDelay(300);
  await maybeSimulateError(0);
  const devices = devicesData as Device[];
  return devices.find((device) => device.id === id);
}

/**
 * Fetch devices by category ID
 */
export async function getDevicesByCategory(
  categoryId: string
) {
  await simulateDelay(350);
  const devices = devicesData as Device[];
  return devices.filter((device) => device.category === categoryId);
}
