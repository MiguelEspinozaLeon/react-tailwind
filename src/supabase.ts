import { createClient } from "@supabase/supabase-js";
import { Database } from "./schema";

export const supabase = createClient<Database>("https://jwvvdkaiqshpjxadopyp.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3dnZka2FpcXNocGp4YWRvcHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NDk5NzIsImV4cCI6MjAxMTMyNTk3Mn0.VCSn4uS_oopYXilyxUgmLYrNB6nz12ZU7Q5CMyMFZxg");