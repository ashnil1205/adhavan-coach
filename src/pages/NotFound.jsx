import { Link } from "react-router-dom";
import { Arrow } from "../components/Bits";
import Magnetic from "../components/Magnetic";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found — Adhavan Coach" desc="The page you were looking for doesn't exist." path="/404" />
      <section className="shell flex min-h-[76svh] flex-col justify-center py-32">
        <span className="kicker mb-6 flex items-center gap-4">
          <span className="h-1.5 w-1.5 bg-primary beacon" /> Error 404
        </span>
        <h1 className="display text-[clamp(3rem,14vw,10rem)]">
          <span className="line-mask"><span style={{ animation: "nf 1s .1s cubic-bezier(.16,1,.32,1) both" }}>Wrong</span></span>
          <span className="line-mask"><span style={{ animation: "nf 1s .22s cubic-bezier(.16,1,.32,1) both" }} className="text-primary">turn.</span></span>
        </h1>
        <style>{`@keyframes nf{from{transform:translate3d(0,110%,0)}to{transform:none}}`}</style>
        <p className="lede mt-8 max-w-md">That page doesn't exist. The workshop, however, definitely does.</p>
        <div className="mt-10">
          <Magnetic strength={0.24}>
            <Link to="/" className="btn btn-primary"><span>Back to Home <Arrow /></span></Link>
          </Magnetic>
        </div>
      </section>
    </>
  );
}
