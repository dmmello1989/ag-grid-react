import { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modelVisibility: true,
      columnDefs: [
        {
          headerName: "Make",
          field: "make",
          sortable: true,
          filter: true,
          checkboxSelection: true,
        },
        {
          headerName: "Model",
          field: "model",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Price",
          field: "price",
          sortable: true,
          filter: true,
        },
      ],
      rowData: [],
    };
  }

  componentDidMount() {
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((res) => res.json())
      .then((rowData) => this.setState({ rowData }));
  }

  componentDidUpdate() {
    this.columnApi.setColumnVisible("model", this.state.modelVisibility);
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  };

  toggleModelColumn = () => {
    this.setState({ modelVisibility: !this.state.modelVisibility });
  };

  onButtonClick = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataString = selectedData
      .map((node) => `${node.make} ${node.model}`)
      .join(", ");
    alert(`Selected Nodes: ${selectedDataString}`);
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: "500px",
          width: "600px",
        }}
      >
        <button type="button" onClick={this.onButtonClick}>
          Selected Rows
        </button>
        <button type="button" onClick={this.toggleModelColumn}>
          Toggle Model Column
        </button>
        <AgGridReact
          rowSelection="multiple"
          rowData={this.state.rowData}
          onGridReady={this.onGridReady}
          columnDefs={this.state.columnDefs}
        ></AgGridReact>
      </div>
    );
  }
}

export default App;
