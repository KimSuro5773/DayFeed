import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl">초기 세팅</h1>
      <Button>버튼 테스트</Button>
      <Button variant={"destructive"}>버튼 테스트</Button>
    </div>
  );
}

export default App;
