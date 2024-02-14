import { ref, set, get } from "firebase/database";
import { database } from "./index"; // Import the database instance

export const addProjects = async (data) => {
  try {
    const dbRef = ref(database, `projects/${data.id}`);
    await set(dbRef, data); // Use await for cleaner async handling

    // Provide more informative feedback
    alert("Project added successfully!");
  } catch (error) {
    console.error("Error adding project:", error);
    alert("Failed to add project. Please try again."); // Inform the user about the error
  }
};

export const getProjects = async () => {
  try {
    const dbRef = ref(database, "projects");
    const snapshot = await get(dbRef);

    const projects = snapshot.val();
    if (projects) {
      // Return an array of projects with their IDs as keys
      return Object.entries(projects).map(([id, projectData]) => ({
        id,
        ...projectData,
      }));
    } else {
      return []; // Return an empty array if no projects exist
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error; // Rethrow the error to handle it appropriately in the calling code
  }
};
