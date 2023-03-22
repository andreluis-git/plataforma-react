import DateFormatUtil from "../utils/DateFormatUtil";
import api from "./Api";

// const listarTemasOld = () => {
//   api
//     .get("/tema/listarTemas", {
//       headers: { Authorization: "Bearer " + localStorage.getItem("token") },
//     })
//     .then((response) => {
//       console.log("get sucesso: ", response.data);
//       return response.data;
//     })
//     .catch((error) => {
//       console.log("erro get :: ", error);
//     });
// };

const listarTemas = () =>
  new Promise((resolve, reject) => {
    api
      .get("/tema/listarTemas", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        console.log("get sucesso: ", response.data);
        response.data.map(
          (item) =>
            (item.dataCriacao = DateFormatUtil.convertDate(item.dataCriacao))
        );
        resolve(response.data);
      })
      .catch((error) => {
        console.log("erro get :: ", error);
        reject(error);
      });
  });

const TemaService = {
  listarTemas,
};

export default TemaService;
