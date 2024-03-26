"use client";
import { artistCardData } from "@/../public/data/artistsCardData";
import LoadMore from "@/components/shared/LoadMore";
import SelectBox from "@/components/shared/SelectBox";
import { IconFilter, IconSearch } from "@tabler/icons-react";
import ArtistsSliderCard from "../home/ArtistsSliderCard";
import { fetchData } from "@/utils/fetchData";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/lib/api";
const artists = [
  { label: "Tom Cook" },
  { label: "Tanya Fox" },
  { label: "Hellen Schmidt" },
];

const genres = [
  { label: "All" },
  { label: "Hip Hop" },
  { label: "Rock" },
  { label: "Pop" },
  { label: "Reggae" },
  { label: "Jazz" },
];

const views = [
  { label: "Views" },
  { label: "Most Item First" },
  { label: "RIP" },
  { label: "A-Z" },
  { label: "Z-A" },
  { label: "youngest To Oldest" },
  { label: "Oldest To Youngest" },
  { label: "Recently Updated" },
  { label: "Birthday" },
  { label: "Monthly Listeners" },
  { label: "Social Followers" },
  { label: " Most Photos" },
  { label: "Following" },
];
const PopularArtists = () => {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [genreValue, setGenresValue] = useState("All");
  const [query, setQuery] = useState("");
  const sq = useSearchParams();
  const router = useRouter();
console.log("query>>>",query);
console.log("artists>>>>",artists);


  useEffect(() => {
    const getData = async () => {
      let data = await fetchData("/data/artists", 1, 12);
      data.artists && setArtists(data.artists);
    };

    getData();
  }, []);

  const handleSearch = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`?query=${query}`);
    const formData = new FormData(e.target);
    const data = await fetchData(
      "/data/artists",
      1,
      12,
      formData.get("query") as string
    );
    setArtists(data.artists);
    // !data.status && toast(data.message)
    try {
    } catch (error: any) {}
  };

  useEffect(() => {
    const run = async () => {
      const q = sq.get("query");
      if (q) {
        setQuery(q);
        const data = await fetchData("/data/artists", 1, 1, q);
        data.status && setArtists(data.artists);
      }
    };
    run();
  }, []);
  const filterArtists = async (filterData) => {
    try {
      const res = await api.server.POST(
        `/data/artists/filter`,
        filterData,
        ""
      );
      const data = await res.json();
      if (data.status) setArtists(data.artists);
      console.log("Filtered artists:", data.artists);
    } catch (error) {
      console.log(error.message);
    }
  };
console.log();

  const handleFilterChange = async (e) => {
    const filterData = {
      gender: e.target.name === 'gender' ? e.target.value : undefined,
      ageFilter: e.target.name === 'age' ? e.target.value : undefined,
      groupType: e.target.name === 'groupType' ? e.target.value : undefined,
      label: e.target.name === 'labels' ? e.target.value : undefined,
    };
    filterArtists(filterData);
  };


  
  const getArtistByGenres = async (genre, page = 1) => {
    try {
      const res = await api.server.POST(
        "/data/artists/genre",
        { genre: genre.toLowerCase(), page: page, pageSize: 10 }, // Adjusted payload data
        ""
      );
      const data = await res.json();
      if (data.status) setArtists(data.artists);
      console.log("data", data.artists);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getArtistsBySortingMode = async (
    vl: { label: string },
    page?: number
  ) => {
    try {
      const res = await api.server.POST(
        `/data/artists/sortmode`,
        { filter: vl?.label, page: page },
        ""
      );
      const data = await res.json();
      if (data.status) setArtists(data.artists);
      console.log("data", data.artists);
    } catch (error) {
      console.log(error.message);
    }
  };

  const loadMore = async () => {
    if (genreValue !== "All") {
      getArtistByGenres({ label: genreValue }, 2);
    } else {
      const data = await fetchData(
        "/data/artists",
        artists.length <= 12 ? 2 : artists.length / 12,
        12
      );
      data.status ? setArtists((prev) => [...prev, ...data.artists]) : null;
    }
  };
  const handleGenreClick = (genre) => {
    getArtistByGenres(genre.label);
  };
  const genreButtons = genres.map((genre, index) => (
    <li className="nav-item" role="presentation" key={index}>
      <button
        className={`nav-link ${index === 0 ? 'active' : ''}`}
        id={`${genre.label}-tab`}
        data-bs-toggle="tab"
        data-bs-target={`#${genre.label}-tab-pane`}
        type="button"
        role="tab"
        aria-controls={`${genre.label}-tab-pane`}
        aria-selected={index === 0 ? 'true' : 'false'}
        aria-label={`${genre.label}-tab`}
        onClick={() => handleGenreClick(genre)}
      >
        {genre.label}
      </button>
    </li>
  ));

  return (
    // <!--genres section-->
    <section className="trending__section pr-24 pl-24 pb-100">
       <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item bg-transparent">
            <h2
              className="accordion-header bg-transparent"
              id="flush-headingOne"
            >
              <button
                className="accordion-button   collapsed cmn--btn"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                <span>
                  <IconFilter />
                  Filter
                </span>
              </button>
            </h2>

            {/* <button className="cmn--btn">
            <span>
              <IconFilter />
              Filter 
            </span>
          </button> */}
          </div>
        </div>
        <div
        id="flush-collapseOne"
        className="accordion-collapse collapse px-3"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#accordionFlushExample"
      >
        <div className="accordion-body">
          <h5 className="fw-400">
            <span>
              {" "}
              &nbsp;
              <IconFilter />
              Advanced Filters
            </span>
          </h5>
          <div className="row mt-4">
            <div className="col-lg-6 mb-4">
              <div className="fw-600 mb-2">GENDER</div>
              <div className="d-flex flex-wrap g-4">
                <label className="tt-buttons">
                  Male
                  <input type="radio" name="gender" value="Male" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Female
                  <input type="radio" name="gender" value="Female" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  None
                  <input type="radio" name="gender" value="None" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="fw-600 mb-2">AGE</div>
              <div className="d-flex flex-wrap g-4">
                <label className="tt-buttons">
                  {"< 20"}
                  <input type="radio" name="age" value="20>age" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  20 - 30
                  <input type="radio" name="age" value="20-30" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  30 - 40
                  <input type="radio" name="age" value="30-40" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  {"> 40"}
                  <input type="radio" name="age" value="40<age" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="fw-600 mb-2">GROUP TYPE</div>
              <div className="d-flex flex-wrap g-4">
                <label className="tt-buttons">
                  Solo
                  <input type="radio" name="groupType" value="Solo" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Group
                  <input type="radio" name="groupType" value="Group" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="fw-600 mb-2">LABELS</div>
              <div className="d-flex flex-wrap g-4">
                <label className="tt-buttons">
                  Interscope Records
                  <input type="radio" name="labels" value="Interscope Records" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Atlantic Records
                  <input type="radio" name="labels" value="Atlantic Records" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Bear Records
                  <input type="radio" name="labels" value="Bear Records" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Fox Records
                  <input type="radio" name="labels" value="Fox Records" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
                <label className="tt-buttons">
                  Rabbit Records
                  <input type="radio" name="labels" value="Rabbit Records" onChange={handleFilterChange} />
                  <button type="button" className="custom-radio"></button>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="trending__selected mb-30 mt-4 d-flex align-items-center justify-content-center justify-content-lg-between">
        <div className="select__lefts d-flex align-items-center">
        <form
            onSubmit={handleSearch}
            className="d-flex align-items-center justify-content-between"
          >
            <input
              type="text"
              name="query"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              placeholder="Search..."
            />
            <button type="submit" aria-label="submit button">
              <IconSearch />
            </button>
          </form>
          {/* <SelectBox options={artists} /> */}
          <SelectBox
            onChange={(vl: { label: string }) => getArtistsBySortingMode(vl)}
            options={views}
          />
        </div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
    {genreButtons}
  </ul>
     
      </div>
   
      <div className="container-fluid">
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home-tab-pane"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="row g-4">
              {artists.map((props) => (
                <div
                  key={props.id_}
                  className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <ArtistsSliderCard {...props} />
                </div>
              ))}
              <div className="text-center mt-40">
                <button className="cmn__simple2" onClick={loadMore}>
                  Load More
                </button>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="row g-4">
              {artists.map((props) => (
                <div
                  key={props.id_}
                  className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <ArtistsSliderCard {...props} />
                </div>
              ))}
              <div className="text-center mt-40">
                <button className="cmn__simple2" onClick={loadMore}>
                  Load More
                </button>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="contact-tab-pane"
            role="tabpanel"
            aria-labelledby="contact-tab"
          >
            <div className="row g-4">
              {artists.map((props) => (
                <div
                  key={props.id_}
                  className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6"
                >
                  <ArtistsSliderCard {...props} />
                </div>
              ))}
              <div className="text-center mt-40">
                <button className="cmn__simple2" onClick={loadMore}>
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularArtists;
