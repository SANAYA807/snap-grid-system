import type { LoaderFunction } from "@remix-run/node";
import { AdminView } from "~/components/AdminView";

import { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const data = formData.get("data");

  console.log("Received data:", data);

  if (data) {
    return Response.json({ success: true, message: "Quiz saved successfully!" });
  }

  return Response.json({ success: false, message: "Failed to save data." });
};

function Index() {
  return (
    <div className="App">
      <AdminView />
    </div>
  );
}

export default Index;
