import React from "react";
import { useParams } from "react-router-dom";
import CollegeDetailsSection from "../../../organisms/group1/IndividualColleges/CollegeDetailsSection";


const collegeData = {
  aab: {
    name: "Kolegji AAB",
    type: "Privat",
    location: "Prishtinë, Kosovë",
    students: "10,000",
    rating: "4.6",
    reviews: "1,200",
    programs: 35,
    description:
      "Kolegji AAB është një ndër institucionet më të njohura private në Kosovë që ofron programe në drejtësi, ekonomi, shkenca kompjuterike, arte, media dhe shumë fusha tjera.",
    contact: "Email: info@aab-edu.net | Tel: +383 44 123 456",
  },
  ubt: {
    name: "UBT – Higher Education Institution",
    type: "Privat",
    location: "Prishtinë, Kosovë",
    students: "15,000",
    rating: "4.7",
    reviews: "2,000",
    programs: 40,
    description:
      "UBT është ndër universitetet lider në Kosovë me kampus modern, programe inovative dhe bashkëpunime ndërkombëtare në shumë fusha të teknologjisë dhe biznesit.",
    contact: "Email: info@ubt-uni.net | Tel: +383 38 541 400",
  },
  riinvest: {
    name: "Kolegji Riinvest",
    type: "Privat",
    location: "Prishtinë, Kosovë",
    students: "7,000",
    rating: "4.5",
    reviews: "900",
    programs: 30,
    description:
      "Kolegji Riinvest është i fokusuar në zhvillimin e lidershipit, menaxhimit dhe inovacionit me qasje praktike ndaj arsimit.",
    contact: "Email: info@riinvest.net | Tel: +383 38 602 701",
  },
  universum: {
    name: "Kolegji Universum",
    type: "Privat",
    location: "Prishtinë, Kosovë",
    students: "6,000",
    rating: "4.6",
    reviews: "850",
    programs: 28,
    description:
      "Kolegji Universum njihet për partneritete ndërkombëtare dhe mundësi shkëmbimi për studentët në mbi 25 vende.",
    contact: "Email: info@universum-ks.org | Tel: +383 38 510 600",
  },
  iliria: {
    name: "Kolegji Iliria",
    type: "Privat",
    location: "Prishtinë, Kosovë",
    students: "5,500",
    rating: "4.4",
    reviews: "780",
    programs: 25,
    description:
      "Kolegji Iliria ofron programe të akredituara në drejtësi, administratë biznesi, ekonomi dhe shkenca kompjuterike.",
    contact: "Email: info@uiliria.org | Tel: +383 38 601 600",
  },
  fama: {
    name: "Kolegji FAMA",
    type: "Privat",
    location: "Prishtinë, Kosovë",
    students: "4,500",
    rating: "4.3",
    reviews: "620",
    programs: 22,
    description:
      "Kolegji FAMA ka traditë mbi 15 vjet në arsimin e lartë me theks në drejtësi, administratë dhe shkenca sociale.",
    contact: "Email: info@fama-ks.com | Tel: +383 38 602 770",
  },
  kadri: {
    name: "Universiteti ‘Kadri Zeka’",
    type: "Publik",
    location: "Gjilan, Kosovë",
    students: "3,200",
    rating: "4.2",
    reviews: "500",
    programs: 20,
    description:
      "Universiteti Kadri Zeka është universitet publik që ofron programe në ekonomi, edukim, kompjuterikë dhe shkenca humane.",
    contact: "Email: info@uni-gjilan.net | Tel: +383 280 390 112",
  },
  haxhi: {
    name: "Universiteti ‘Haxhi Zeka’",
    type: "Publik",
    location: "Pejë, Kosovë",
    students: "4,000",
    rating: "4.4",
    reviews: "650",
    programs: 25,
    description:
      "Universiteti Haxhi Zeka është një institucion publik me orientim në turizëm, agrikulturë dhe shkenca ekonomike.",
    contact: "Email: info@unhz.eu | Tel: +383 39 432 345",
  },
};

const CollegeDetailsPage = () => {
  const { collegeId } = useParams();
  const college = collegeData[collegeId] || collegeData["aab"];
  return <CollegeDetailsSection college={college} />;
};

export default CollegeDetailsPage;
