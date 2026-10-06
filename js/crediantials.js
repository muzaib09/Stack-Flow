const PROJECTURL = "https://jmulrvhuplimrynvicaz.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdWxydmh1cGxpbXJ5bnZpY2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyOTQzNDUsImV4cCI6MjEwNjg3MDM0NX0.fud13XMH2pGleIVZoGHSCPLoD0q5JyA2UDTGeyo8Iv4";
const supabase = window.supabase.createClient(PROJECTURL,ANON_KEY);

export default supabase;
