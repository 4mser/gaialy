import VisualizationPage from "@/components/shared/ChartsVisualizationPage"
import { Collection } from "@/components/shared/Collection"
import CombinedVisualizationPage from "@/components/shared/CombinedVisualizationPage"
import RenderScene from "@/components/shared/RenderScene"
import ThreeScene from "@/components/shared/ThreeScene"
import { navLinks } from "@/constants"
import { IqaContrast } from "@/data/IQACONTRAST"
import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link"



const Home = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';



  const images = await getAllImages({ page, searchQuery})

  return (
    <>
      <section>
        
      </section>
      {/* <section className="home">
        <h1 className="home-heading">
          AI ANOMALY DETECTIONS
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section> */}
        <RenderScene />
        <VisualizationPage />
        <CombinedVisualizationPage />
      <section className="mt-10">
        <Collection 
          hasSearch={true}
          images={images?.data}
          totalPages={images?.totalPage}
          page={page}
        />
      </section>
    </>
  )
}

export default Home