import { MdMoney } from "react-icons/md";
import { BiDiamond } from "react-icons/bi";
import { AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./home.css";
import Footer from "../../components/footer";

export default function Home() {
  return (
    <div className="w-full h-screen bg-red-500 flex-col">
      {/* backdrop */}
      <div className="bg-black w-full md:h-[50%]  relative ">
        <div className="absolute right-[50%] bottom-[17%] text-secondary transform translate-x-[50%]">
          <Link
            to="/gallery"
            className="bg-accent md:p-2 p-1 text-[10px] md:text-lg font-semibold hover:bg-purple-900 rounded-md text-primary"
          >
            Rental Package
          </Link>
        </div>
      </div>

      {/* category */}

      <div className="text-secondary bg-primary w-full flex flex-col h-auto min-h-[900px] ">
        <div className="flex justify-center items-center w-full h-[300px] flex-col text-center">
          <h1 className="text-4xl font-semibold w-[90%] md:w-[700px]">
            We provide premiere audio and visual
          </h1>
          <h1 className="text-4xl font-semibold">equipment rentals</h1>
          <p className="text-xl">Here's What we offer</p>
        </div>

        <div className="flex flex-col md:flex-row w-full h-auto md:h-[600px] justify-center items-center">
          <div className="m-8 w-[90%] md:w-[400px]">
            <img src="./home1.jpg" className="rounded-lg w-full"></img>
            <div className="flex flex-col items-center text-center">
              <h1 className="font-semibold text-3xl">Corporate Events</h1>
              <p>
                We offer competitive pricing and quality audio visual equipment
                specific to your needs. Call or email for a custom quote today!
              </p>
              <Link
                className="bg-accent w-[100px] h-[40px] text-primary font-semibold flex justify-center items-center rounded-md mt-3"
                to="/gallery"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="m-8 w-[90%] md:w-[400px]">
            <img src="./home2.jpg" className="rounded-lg w-full"></img>
            <div className="flex flex-col items-center text-center">
              <h1 className="font-semibold text-3xl">Wedding & Party</h1>
              <p>
                Looking for audio-video equipment for your special day? Check
                out our custom wedding rental packages available in the City
                area!
              </p>
              <Link
                className="bg-accent w-[100px] h-[40px] text-primary font-semibold flex justify-center items-center rounded-md mt-3"
                to="/gallery"
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="m-8 w-[90%] md:w-[400px]">
            <img src="./home3.jpg" className="rounded-lg w-full"></img>
            <div className="flex flex-col items-center text-center">
              <h1 className="font-semibold text-3xl">Visual</h1>
              <p>
                We offer high quality screens, projectors and monitor rentals.
                Email or call us and we’ll send you a custom quote for your
                event.
              </p>
              <Link
                className="bg-accent w-[100px] h-[40px] text-primary font-semibold flex justify-center items-center rounded-md mt-3"
                to="/gallery"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* poster2 */}

      <div className="w-full h-[300px] md:h-[400px] relative flex justify-center items-center flex-col">
        <img
          src="./poster2.jpg"
          className="w-full md:h-[500px] h-[400px] mt-[-8px] mb-[-5px] object-cover brightness-50 blur-sm"
          alt="Sound Tech Support"
        />
        <div className="absolute flex items-center justify-center flex-col text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Need a skilled sound tech on site?
          </h1>
          <p className="text-lg md:text-xl mt-2">
            No problem. We can run your equipment for you so you can focus on
            running your successful event.
          </p>
          <Link
            to=""
            className="bg-accent w-[120px] h-[40px] flex justify-center items-center rounded-md text-primary font-semibold mt-4"
          >
            Book Now
          </Link>
        </div>
      </div>

      {/* Details Section */}
      <div className="w-full min-h-[500px] bg-primary flex flex-col justify-center items-center text-white p-6">
        <h1 className="text-3xl md:text-4xl font-semibold mt-6 text-center">
          Why rent from Audio Rent KV?
        </h1>
        <p className="text-base md:text-lg font-semibold text-center mt-2 px-4">
          We care about your event just as much as you do. We provide a seamless
          rental and booking process and price.
        </p>
        <p className="text-base md:text-lg font-semibold text-center">
          Ourselves on these three things:
        </p>

        <div className="flex flex-col md:flex-row mt-8 w-full max-w-6xl">
          {/* Dependable */}
          <div className="flex flex-col w-full md:w-1/3 p-6 items-center ">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4 flex flex-row items-center">
              <AiOutlineStar className="text-accent text-4xl mr-2" />
              Dependable
            </h1>
            <p>
              We treat your event as if it were our own, which means we make it
              a top priority. We ensure the equipment setup is functioning on
              time with seamless communication throughout the process.
            </p>
          </div>

          {/* Quality Equipment */}
          <div className="flex flex-col w-full md:w-1/3 p-6 items-center">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4 flex flex-row items-center">
              <BiDiamond className="text-accent text-4xl mr-2" />
              Quality Equipment
            </h1>
            <p>
              We provide the best name-brand equipment in the industry such as
              JBL, Shure, and QSC. We trust these brands to deliver the quality
              your event needs.
            </p>
          </div>

          {/* Competitive */}
          <div className="flex flex-col w-full md:w-1/3 p-6 items-center ">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4 flex flex-row items-center">
              <MdMoney className="text-accent text-4xl mr-2" />
              Competitive
            </h1>
            <p>
              When it comes to top-quality equipment and services, we offer some
              of the best rates in the city.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Testimonials Section */}
      <div className="w-full min-h-[400px] flex flex-col items-center pt-10 bg-primary text-white px-6 text-center">
        <h2 className="text-lg md:text-xl font-semibold mb-6">
          See what our customers are saying.
        </h2>

        <div className="flex flex-col items-center max-w-3xl">
          <div className="text-4xl md:text-5xl border-2 w-14 h-14 flex justify-center items-center rounded-full mb-4">
            "
          </div>
          <p className="text-base md:text-lg">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel
            sapien nec velit posuere placerat at ac justo. Nulla facilisi. Duis
            suscipit, lorem at sodales ultrices, lorem sapien maximus risus,
            eget feugiat eros purus at augue."
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="w-full min-h-[300px] bg-blue-950 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          Ready to work with Audio Rent KV?
        </h1>
        <p className="text-base md:text-lg mb-6">
          Check out our equipment packages or contact us today!
        </p>
        <Link
          to="/item"
          className="bg-accent px-6 py-3 rounded-md flex justify-center items-center text-black font-semibold hover:bg-purple-900 transition"
        >
          Book Now
        </Link>
      </div>

      <Footer />
    </div>
  );
}
