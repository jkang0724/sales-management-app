import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIntl } from "react-intl";
import { fetchCommonCodes } from "../utilities/common.actions";
import { fetchCompanies } from "./company.actions";
import EditCompanyModal from "../../components/EditCompanyModal";
import DeleteModal from "../../components/DeleteModal";

import { Container, Title } from "../../components/styles";
import ListTable from "../../components/table/ListTable";
import SearchAndAdd from "../../components/companyList/SearchAndAdd";
import { formatCompanyListData } from "./formatter/formatTableData";
import { toastSend } from "../../components/toastify";
import { resetApiError } from "../../store/apiError/apiError.actions";

const customStyle = {
  columnsWidth: "200px 480px 160px 230px 120px 120px 120px",
};
const CompanyList = () => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const { companies, isOutdated } = useSelector((state) => state.companyStore);
  const { errorStatus } = useSelector((state) => state.apiErrorStore);
  const [searchText, setSearchText] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    dispatch(fetchCommonCodes());
  }, [dispatch]);

  useEffect(() => {
    if (isOutdated) {
      dispatch(fetchCompanies());
    }
  }, [dispatch, isOutdated]);

  useEffect(() => {
    if (errorStatus) {
      toastSend(errorStatus.message);
      dispatch(resetApiError());
    }
  }, [dispatch, errorStatus]);

  const updateQuery = (event) => setSearchText(event.target.value);

  const filteredCompanies = companies.filter((company) => {
    const name = company.companyName.toLowerCase();
    const type = company.companyTypeDescription.toLowerCase();
    const address = company.address?.toLowerCase();
    const reg = company.registrationNo.replace(/-/g, "");
    const phone = company.phoneNo?.replace(/-/g, "");
    const status = company.statusDescription;
    const text = searchText.toLowerCase();

    return (
      name.includes(text) ||
      type.includes(text) ||
      address?.includes(text) ||
      reg.includes(text) ||
      phone?.includes(text) ||
      status.includes(text)
    );
  });

  const closeCompanyModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedCompany(null);
  };

  const toggleEditCompanyModal = (id) => {
    return (
      editModalOpen && (
        <EditCompanyModal
          companyId={id}
          isOpen={editModalOpen}
          cancel={closeCompanyModal}
        />
      )
    );
  };

  const toggleDeleteCompanyModal = (id) => {
    return (
      deleteModalOpen && (
        <DeleteModal
          id={id}
          deletedName={selectedCompany.companyName}
          type="company"
          isOpen={deleteModalOpen}
          cancel={closeCompanyModal}
        />
      )
    );
  };

  return (
    <Container>
      <Title>{intl.formatMessage({ id: "companyList.title" })}</Title>
      <SearchAndAdd
        value={searchText}
        onChange={updateQuery}
        onClickSelect={setSelectedCompany}
        setEditModalOpen={setEditModalOpen}
      />
      <ListTable
        tableData={formatCompanyListData(filteredCompanies)}
        customStyle={customStyle}
        onClickSelect={setSelectedCompany}
        setEditModalOpen={setEditModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
      {toggleEditCompanyModal(selectedCompany?.id)}
      {toggleDeleteCompanyModal(selectedCompany?.id)}
    </Container>
  );
};

export default CompanyList;
