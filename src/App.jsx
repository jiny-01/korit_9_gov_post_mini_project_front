import Loading from "./components/common/Loading";
import MainLayout from "./components/common/MainLayout";
import AuthRoute from "./routes/AuthRoute";

function App() {
  return (
    <MainLayout>
      {/* <Loading /> */}
      <AuthRoute />
    </MainLayout>
  );
}

export default App;
