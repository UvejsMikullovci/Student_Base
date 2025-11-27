import React from "react";
import "./SuccessSection.css";
import IconCircle from "../../molecules/Homepage/IconCircle";
import students2 from "../../../media/students2.jpg";
import classroom from "../../../media/classroom.jpg";
import grad from "../../../media/grad.jpg";
import uni2 from "../../../media/uni2.jpg";

const SuccessSection = () => {
  return (
    <section className="success-section">
      <div className="success-content">
        <h3 clsssName="title">Suksesi i studentëve tanë</h3>
        <p className="text">
         Mijëra studentë kanë gjetur rrugën e tyre drejt arsimit të lartë me
          Studo. Bashkohu me ta dhe fillo udhëtimin tënd akademik.
        </p>

        <div className="success-items">
          <div className="success-item">
            <IconCircle icon="search" />
            <div>
              <h4>Zgjedhje të shumta</h4>
              <p>
                Qasje në 25+ kolegje dhe 150+ programe studimi në të gjithë
                Kosovën.
              </p>
            </div>
          </div>

          <div className="success-item">
            <IconCircle icon="info" />
            <div>
              <h4>Informacion i detajuar</h4>
              <p>
                Të dhëna të plota për çdo kolegj, duke përfshirë programet,
                çmimet dhe statistikat.
              </p>
            </div>
          </div>

          <div className="success-item">
            <IconCircle icon="support" />
            <div>
              <h4>Mbështetje e vazhdueshme</h4>
              <p>
                Ekipi ynë është këtu për të të ndihmuar në çdo hap të procesit.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="success-images">
        <div className="img1">
      <img src={students2} alt="Students" />
      </div>
      <div className="img2">
  <img src={classroom} alt="Classroom" />
  </div>
  <div className="img3">
  <img src={grad} alt="Graduation" />
  </div>
  <div className="img4">
  <img src={uni2} alt="University" />
  </div>
      </div>
    </section>
  );
};

export default SuccessSection;