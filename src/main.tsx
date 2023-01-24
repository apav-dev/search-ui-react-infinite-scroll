import { provideHeadless, SandboxEndpoints, SearchHeadlessProvider } from "@yext/search-headless-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const searcher = provideHeadless({
  apiKey: "55511319ffb8213b10c200d281668382",
  experienceKey: "pokemon-search",
  verticalKey: "pokémon",
  locale: "en",
  endpoints: SandboxEndpoints,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SearchHeadlessProvider searcher={searcher}>
      <App />
    </SearchHeadlessProvider>
  </React.StrictMode>
);
