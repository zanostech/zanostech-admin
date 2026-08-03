import { serverFetch, setCookie } from "./src/lib/serverFetch";
import { loginAdmin } from "./src/services/auth/loginAdmin";
import { createTeamMember } from "./src/services/dashboard/teamMemberService";

async function run() {
  console.log("Logging in...");
  const loginRes = await loginAdmin({ email: "superadmin@gmail.com", password: "superadmin1" });
  console.log("Login result:", loginRes.success);
  
  if (loginRes.success) {
    const formData = new FormData();
    formData.set("name", "API Test User");
    formData.set("designation", "API Tester");
    formData.set("socialLinks", JSON.stringify(["https://linkedin.com/in/test", "https://twitter.com/test"]));
    
    console.log("Creating team member via API...");
    const createRes = await createTeamMember(formData);
    console.log("Create result:", createRes);
  }
}

run();
