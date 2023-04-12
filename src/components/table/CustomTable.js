import { useRef } from "react";
import React, {  useState ,useMemo} from "react";
import "./CustomTable.css";
// import Pagination from "../Pagination/Pagination";

let PageSize = 10;


const CustomTable=(props)=>{
    const {data,selectAll,selectOne,deleteUser,editUser,saveUser}=props;
const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

    // const [currentPage, setCurrentPage] = useState(1);

    // const currentTableData = useMemo(() => {
    //   const firstPageIndex = (currentPage - 1) * PageSize;
    //   const lastPageIndex = firstPageIndex + PageSize;
    //   return data.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage]);

    return(
        <div className="main-content">
    <div className="container">
        <div className="row pt-5">
            <div className="col-12 col-sm-8 offset-sm-2 text-left p-5">
                <table className="table border shadow">
                    <thead className="thead-dark">
                        <tr>
                            {/* <th scope="col"><input type="checkbox" onChange={(e) => {selectAll(e,(currentPage-1)*PageSize,PageSize)}}></input></th> */}
                            <th scope="col"><input type="checkbox" onChange={(e) => {selectAll(e,)}}></input></th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((ele)=>(
                                <tr key={ele.id} className={ele.selected ? "selected" : ""}>
                                    <td><input type="checkbox" id={`checkbox-${ele.id}`}
                                    data={`${ele.selected}`}
                                    checked={ele.selected}
                                    onChange={()=>selectOne(ele.id)}></input>
                                    </td>
                                    <td>
                                        <input
                                        className={ele.edit ? "editable" : "readOnly"}
                                        readOnly={!ele.edit}
                                        ref={nameRef}
                                        type="text"
                                        name="name"
                                        defaultValue={ele.name}
                                        ></input>
                                    </td>
                                    <td>
                                        <input
                                        className={ele.edit ? "editable" : "readOnly"}
                                        readOnly={!ele.edit}
                                        ref={emailRef}
                                        type="text"
                                        name="email"
                                        defaultValue={ele.email}
                                        ></input>
                                    </td>
                                    <td>
                                        <input
                                        className={ele.edit ? "editable" : "readOnly"}
                                        readOnly={!ele.edit}
                                        ref={roleRef}
                                        type="text"
                                        name="role"
                                        defaultValue={ele.role}
                                        ></input>
                                    </td>
                                    <td>
                                    {ele.edit ? (
                                            <i onClick={()=>saveUser(ele.id,nameRef,emailRef,roleRef)} className="fa fa-save save"></i>
                                            ) : (
                                            <i onClick={()=>editUser(ele.id)} className='fa fa-edit edit'></i>
                                            )
                                    }
                                    <i onClick={()=>deleteUser(ele.id)} className="fa fa-trash-o delete"></i>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {/* <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={data.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    /> */}
            </div>
        </div>
    </div>
</div>
    )
}


export default CustomTable;


