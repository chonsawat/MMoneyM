import { invoke } from "@tauri-apps/api/tauri";

const [greetMsg, setGreetMsg] = useState("");

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  setGreetMsg(await invoke("greet", { name }));
}
