import CrewTeam from "../partials/crewTeam";

export default function Crew() {
  return (
    <section id="crew" className="relative">
      <div className="center">
        <div className="container py-[62px] flex flex-col gap-y-[62px]">
          <h2 className="text-center text-7xl font-[500] font-[Cairo]">
            MEET THE TEAM
          </h2>
          <div>
            <CrewTeam />
          </div>
        </div>
      </div>
    </section>
  );
}
