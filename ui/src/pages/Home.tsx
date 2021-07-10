import { Link } from "react-router-dom";

import championDetails from "../assets/championDetails.png";
import matchDetails from "../assets/matchDetails.png";

const Home = (): JSX.Element => (
  <div className="home">
    <h1>
      Analytics about your latest matches and information about your favorite
      champions
    </h1>
    {/* <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, optio?
      Esse, non consequatur! A, nemo enim quaerat reprehenderit, dignissimos
      esse fugiat illum nam recusandae facere repellat, aspernatur quos quas ea?
      Voluptates voluptatum consequuntur minima consectetur consequatur illum
      odit mollitia! Fugiat dolorem nihil magnam temporibus placeat voluptates
      suscipit esse error asperiores vel. Officia amet temporibus ad esse,
      deserunt omnis iste animi. Fugiat, velit. Inventore explicabo error
      consequuntur, ipsum possimus nesciunt minus alias! Id accusantium vero
      nulla? Fugiat, ullam magnam excepturi natus aperiam autem porro qui
      quibusdam, tempore laboriosam debitis cupiditate sed? Culpa officia ut
      perferendis voluptatum placeat atque quisquam provident molestiae omnis
      optio? Facilis quibusdam recusandae unde et aliquid fugiat, fugit
      distinctio, neque hic, eaque earum magnam. Suscipit, facere nulla. Minima.
      Enim voluptates facilis at optio nam perspiciatis quidem nihil, odit esse
      porro quas fugit? Modi numquam ut, consectetur expedita, aliquid possimus
      corrupti rerum officia, esse magni voluptatum. Tenetur, blanditiis
      repellendus.
    </p> */}

    {/* <div className="content"> */}
    <div className="champions">
      <img className="championDetails" src={championDetails} />

      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, est
          ratione earum alias totam veritatis fugit ullam ipsam commodi rem quo
          voluptate laborum doloribus rerum quaerat minus perferendis eligendi
          harum.
        </p>
        <Link to="/champions">Go to champions</Link>
      </div>
    </div>

    <div className="players">
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, est
          ratione earum alias totam veritatis fugit ullam ipsam commodi rem quo
          voluptate laborum doloribus rerum quaerat minus perferendis eligendi
          harum.
        </p>
        <Link to="/players">Go to players</Link>
      </div>

      <img className="matchDetails" src={matchDetails} />
    </div>
    {/* </div> */}
  </div>
);

export default Home;
