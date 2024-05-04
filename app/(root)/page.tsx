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
        <RenderScene />
        <br />
        <VisualizationPage />
        <br />
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