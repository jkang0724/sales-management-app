import React from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { Button } from "../styles";
import { convertToObject, isEmpty, truncatedStr } from "../../utility/utils";

const Table = styled.div`
  display: flex;
  margin: 20px;
  width: 100%;
`;

const TableWrapper = styled.table`
  width: 100%;
  max-width: 900px;
  min-width: 300px;
  ${css`
    ${({ tableStyle }) => tableStyle}
  `}
`;

const TableHeader = styled.div`
  width: 100%;
`;

const TableBody = styled.tbody`
  width: 100%;
`;

const DataRow = styled.tr`
  border-bottom: 1px solid #ddd;
  line-height: 50px;
  display: grid;
  display: -ms-grid;
  grid-template-columns: ${({ columnsWidth }) => columnsWidth};
  -ms-grid-columns: ${({ columnsWidth }) => columnsWidth};
`;

const RowData = styled.td`
  display: block;
  width: 100%;
`;

const LabelRow = styled.tr`
  height: 35px;
  line-height: 35px;
  padding-left: 3px;
  background-color: #2f7ad1;
  color: #fff;
  display: grid;
  display: -ms-grid;
  grid-template-columns: ${({ columnsWidth }) => columnsWidth};
  -ms-grid-columns: ${({ columnsWidth }) => columnsWidth};
`;
const LabelData = styled.td`
  display: block;
  height: 50px;
  width: 100%;
`;

const TableBodyRow = ({
  rowData,
  columnsWidth,
  onClickSelect,
  setEditModalOpen,
  setDeleteModalOpen,
}) => {
  const intl = useIntl();
  return (
    <DataRow key={rowData[1].data} columnsWidth={columnsWidth}>
      {rowData.map((column) => {
        if (column.visible) {
          return <RowData key={column.id}>{truncatedStr(column.data)}</RowData>;
        }
        return null;
      })}
      <Button
        onClick={() => {
          onClickSelect(convertToObject(rowData));
          setEditModalOpen(true);
        }}
      >
        {intl.formatMessage({ id: "common.edit" })}
      </Button>
      <Button
        onClick={() => {
          onClickSelect(convertToObject(rowData));
          setDeleteModalOpen(true);
        }}
      >
        {intl.formatMessage({ id: "common.delete" })}
      </Button>
    </DataRow>
  );
};
const TableHeaderRow = ({ labelData, columnsWidth }) => {
  const intl = useIntl();
  return (
    <LabelRow columnsWidth={columnsWidth}>
      {labelData.map((column) => {
        if (column.visible) {
          return (
            <LabelData key={column.id}>
              {intl.formatMessage({ id: `company.${column.id}` })}
            </LabelData>
          );
        }
        return null;
      })}
    </LabelRow>
  );
};
const ListTable = ({
  tableData,
  customStyle,
  onClickSelect,
  setEditModalOpen,
  setDeleteModalOpen,
}) => {
  const { columnsWidth } = customStyle;
  return (
    <Table>
      <TableWrapper>
        <TableHeader>
          {!isEmpty(tableData) && (
            <TableHeaderRow
              labelData={tableData[0]}
              columnsWidth={columnsWidth}
            />
          )}
        </TableHeader>
        <TableBody>
          {tableData.map((row) => {
            return (
              <TableBodyRow
                key={row[1].data}
                rowData={row}
                columnsWidth={columnsWidth}
                onClickSelect={onClickSelect}
                setEditModalOpen={setEditModalOpen}
                setDeleteModalOpen={setDeleteModalOpen}
              />
            );
          })}
        </TableBody>
      </TableWrapper>
    </Table>
  );
};

TableBodyRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  rowData: PropTypes.object.isRequired,
  columnsWidth: PropTypes.string.isRequired,
  onClickSelect: PropTypes.func.isRequired,
  setEditModalOpen: PropTypes.func.isRequired,
  setDeleteModalOpen: PropTypes.func.isRequired,
};
TableHeaderRow.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  labelData: PropTypes.object.isRequired,
  columnsWidth: PropTypes.string.isRequired,
};

ListTable.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        data: PropTypes.string,
        visible: PropTypes.bool,
      }),
    ),
  ).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  customStyle: PropTypes.object,
  onClickSelect: PropTypes.func.isRequired,
  setEditModalOpen: PropTypes.func.isRequired,
  setDeleteModalOpen: PropTypes.func.isRequired,
};

ListTable.defaultProps = { customStyle: {} };

export default ListTable;
