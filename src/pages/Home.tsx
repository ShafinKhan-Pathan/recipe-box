import StyledButton from "../components/StyledButton";
import { Lightbulb,SquareArrowRight, BookOpen } from "lucide-react";
const Home = () => {
  return (
    <>
      <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
        <section className="text-center p-4 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Welcome to <span className="text-flamingo">Recipe Box</span></h1>
          <h3 className=" text-gray-400 text-lg md:text-4xl">
            Your personal recipe manager. <span className="text-flamingo">Create, browse, and organize</span> your
            favorite recipes all in one place.
          </h3>
        </section>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <StyledButton
            icon={Lightbulb}
            name="Create Your Own Recipe"
            shortDescription="Add, organize, and manage your personal recipes in one place. Customize ingredients, steps, and cooking details exactly the way you like."
            tag="Build your personal recipe collection"
            linkTo="/create"
            redirectIcon={SquareArrowRight}
          />
          <StyledButton
            icon={BookOpen}
            name="Explore & Discover Recipes"
            shortDescription="Browse through a growing collection of delicious recipes, get inspired, and find the perfect dish for any occasion or mood."
            tag="Discover new ideas and flavors"
            linkTo="browse"
            color="blue"
            redirectIcon={SquareArrowRight}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
