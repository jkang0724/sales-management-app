import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";

import {
  SearchWrapper,
  LabelAndSearch,
  Label,
  SearchBar,
  Button,
} from "../styles";

const SearchAndAdd = ({ value, onChange, onClickSelect, setEditModalOpen }) => {
  const intl = useIntl();
  return (
    <SearchWrapper>
      <LabelAndSearch>
        <Label htmlFor="search-input">
          {intl.formatMessage({ id: "common.searchByKeyword" })}:
        </Label>
        <SearchBar
          id="search-input"
          type="text"
          value={value}
          onChange={() => onChange()}
        />
      </LabelAndSearch>
      <Button
        add
        width="150px"
        onClick={() => {
          onClickSelect(null);
          setEditModalOpen(true);
        }}
      >
        {intl.formatMessage({ id: "company.add" })}
      </Button>
    </SearchWrapper>
  );
};

SearchAndAdd.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClickSelect: PropTypes.func.isRequired,
  setEditModalOpen: PropTypes.func.isRequired,
};

export default SearchAndAdd;
