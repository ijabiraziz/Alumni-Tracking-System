import React from 'react'
import { Link } from 'react-router-dom';

function MainTable() {
  return (
    <div className="recent-alumni">
    <h2>Recent Alumni</h2>
    <table>

      <thead>
        <tr>
          <th>Alumni Name</th>
          <th>Program </th>
          <th>GPA</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hazrat Ali</td>
          <td>BS</td>
          <td>3.5</td>
          <td className="warning">+923159675198</td>
          <td className="primary">Details</td>
        </tr>
        <tr>
          <td>Hazrat Ali</td>
          <td>BS</td>
          <td>3.5</td>
          <td className="warning">+923159675198</td>
          <td className="primary">Details</td>
        </tr>
        <tr>
          <td>Hazrat Ali</td>
          <td>BS</td>
          <td>3.5</td>
          <td className="warning">+923159675198</td>
          <td className="primary">Details</td>
        </tr>
        <tr>
          <td>Hazrat Ali</td>
          <td>BS</td>
          <td>3.5</td>
          <td className="warning">+923159675198</td>
          <td className="primary">Details</td>
        </tr>
        <tr>
          <td>Hazrat Ali</td>
          <td>BS</td>
          <td>3.5</td>
          <td className="warning">+923159675198</td>
          <td className="primary">Details</td>
        </tr>
        <tr>
          <td>Hazrat Ali</td>
          <td>BS</td>
          <td>3.5</td>
          <td className="warning">+923159675198</td>
          <td className="primary">Details</td>
        </tr>
      </tbody>
    </table>
    <Link to="/"> Show All </Link>
  </div>
  )
}

export default MainTable