import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useQuery } from "react-query";
import { getParts } from "../libs/helper";


const DropDown = ({ onSelectPairs, defaultValue , status }) => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [partenaires, setSelectedPairs] = useState([]);

  useEffect(() => {
    onSelectPairs(partenaires);
  }, [partenaires]);

  const { isLoading, isError, data, error } = useQuery("Parts", getParts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.Parts) {
    return <div>No data available</div>;
  }

  const options = data.Parts.map((e, i) => ({
    value: e.Denomination,
    label: e.Denomination,
    logo: e.Logo, // Add the logo property to each option
  }));

  const attributes = [
    { value: "golden", label: "Golden" },
    { value: "silver", label: "Silver" },
    { value: "bronze", label: "Bronze" },
    // Add more attributes as needed
  ];

  const handlePartChange = (selectedPart) => {
    setSelectedPart(selectedPart);
  };

  const handleAttributeChange = (selectedAttribute) => {
    setSelectedAttribute(selectedAttribute);
  };

  const handleAddPair = (e) => {
    e.preventDefault();

    if (selectedPart && selectedAttribute) {
      const pair = `${selectedPart.label}|${selectedAttribute.label}`;
      setSelectedPairs([...partenaires, pair]);
      setSelectedPart(null);
      setSelectedAttribute(null);
    }
  };

  // (defaultValue) && setSelectedPairs(...defaultValue);

  return (
    <div>
      <div className="container flex justify-between">
        <div className="w-full">
          <h2>Sélectionner un partenaire</h2>
          <Select
            options={options}
            value={selectedPart}
            onChange={handlePartChange}
          />
        </div>

        <div className="w-full ml-2">
          <h2>Sélectionner un catègorie</h2>
          <Select
            options={attributes}
            value={selectedAttribute}
            onChange={handleAttributeChange}
          />
        </div>
      </div>

      <button
        className="w-full mb-2 bg-stone-50 border-[1px] border-stone-300 p-2 mt-4 rounded-md"
        onClick={handleAddPair}
      >
        Ajouter un partenaire
      </button>

      {partenaires.length > 0 && (
        <>
          <h2>Partenaires sélectionnés</h2>
        <div className="grid md:gap-10 md:grid-cols-2 ">
          {partenaires.map((pair, index) => {
            const selectedPartValue = pair.split("|")[0];
            const selectedAttribute = pair.split("|")[1];

            // Find the selected part option by its value
            const selectedPartOption = options.find(
              (option) => option.value === selectedPartValue
            );

            return (
              <div key={index} className="">
                <div className="container flex my-auto  w-full mt-2 rounded-md border border-slate-300">
                  <div className="container p-2">
                    <span>Partenaire numéro: {index + 1}</span>
                    <p>Nom de partenaire: {selectedPartValue}</p>
                    <p>
                      Catégorie de partenaire:{" "}
                      {selectedAttribute === "Silver" ? (
                        <span className="ml-2 bg-gray-50 px-[3px] border border-stone-300 rounded-md">
                          {selectedAttribute}
                        </span>
                      ) : selectedAttribute === "Golden" ? (
                        <span className="ml-2 bg-yellow-50 px-[3px] border border-stone-300 rounded-md">
                          {selectedAttribute}
                        </span>
                      ) : selectedAttribute === "Bronze" ? (
                        <span className="ml-2 bg-red-50 px-[3px] border border-stone-300 rounded-md">
                          {selectedAttribute}
                        </span>
                      ) : null}
                    </p>

                  </div>
                  <div>
                   {selectedPartOption && selectedPartOption.logo && (
                      <img
                      className=" h-full w-[170px] rounded-r-md"
                        src={selectedPartOption.logo}
                        alt="Partenaire Logo"
                      />
                    )}
                </div>
                </div>
              </div>
            );
          })}
        </div>
        </>
      )}
    </div>
  );
};

export default DropDown;
