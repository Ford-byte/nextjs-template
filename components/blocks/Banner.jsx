import useLocalStorage from "../store/localStorage";

export default function Banner(props) {
  const { showLazy } = useLocalStorage();

  console.log(props.sample);

  return (
    <section className="min-h-[700px] bg-black/20 center">
      <div className="container">
        <h2 className="full-center">HOME</h2>
      </div>
    </section>
  );
}
