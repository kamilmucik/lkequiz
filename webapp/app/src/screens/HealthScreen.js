import React from "react";
import packageJson from '../../package.json';

const HealthScreen = () => {
  return (
    <div className="container">
        <h3 className="p-3 text-center">HealthCheck</h3>
          <table className="table table-sm">
            <tbody>
                <tr><td class="col-md-3">Wersja</td><td class="align-middle col-md-7">{packageJson.version}</td></tr>
            </tbody>
          </table>
    </div>
  );
  };
  
  export default HealthScreen;