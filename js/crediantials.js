const PROJECT_URL = "https://xscxyjlmtxjxdwoafrxc.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzY3h5amxtdHhqeGR3b2FmcnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEwMzg5NzEsImV4cCI6MjEwNjYxNDk3MX0.6WnCDMVmPc5T-6ljThhal66-25uPO8WQDQymhfpnJYI";

const supabase = window.supabase.createClient(PROJECT_URL, ANON_KEY);
export default supabase;