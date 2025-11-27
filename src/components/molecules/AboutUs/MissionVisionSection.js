import React from "react";
import IconBox from "../../atoms/AboutUsAndContact/IconBox";
import { FaBullseye, FaLightbulb, FaAward, FaUsers } from "react-icons/fa";
import "./MissionVisionSection.css";

export default function MissionVisionSection() {
  return (
    <section className="mission-section">
      <div className="mission-vision-header">
  <h2>Qëllimi dhe Parimet tona</h2>
  <p>Ne udhëhiqemi nga përkushtimi, ndershmëria dhe bashkëpunimi për të krijuar një ndikim pozitiv.</p>
</div>


      <div className="mission-container">
        <IconBox
          icon={<FaBullseye />}
          title="Qëllimi"
          description="Të bëhemi platforma lider në Shqipëri për kërkimin dhe aplikimin në institucione arsimore, duke mundësuar akses të lehtë dhe transparent në arsimin e lartë."
        />
        <IconBox
          icon={<FaLightbulb />}
          title="Vizioni"
          description="Të krijojmë një ekosistem arsimor ku çdo student mund të gjejë dhe t’i aplikojë kolegjes së duhur bazuar në interesat dhe aftësitë e tyre."
        />
        <IconBox
          icon={<FaAward />}
          title="Cilësia"
          description="Garatomjë që çdo institucion në platformën tonë është i akredituar dhe ofron standarde të larta arsimore."
        />
        <IconBox
          icon={<FaUsers />}
          title="Komuniteti"
          description="Ndërtojmë një komunitet të fortë të studentëve, profesorëve dhe institucioneve që mbështesin njëri-tjetrin."
        />
      </div>
    </section>
  );
}
