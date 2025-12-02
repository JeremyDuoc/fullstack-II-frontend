import React from 'react';

import toast from 'react-hot-toast';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';





function AdminCategorias() {

 

  const productos: any[] = []; // Array vacío temporal para que no explote

  const categorias = Array.from(new Set(productos.map(p => p.category)));

 



  // 3. Funciones simuladas

  const handleEdit = (categoryName: string) => {

    toast(`Próximamente: Editar ${categoryName}`);

  };



  const handleDelete = (categoryName: string) => {

    if (window.confirm(`¿Estás seguro de que quieres eliminar "${categoryName}"?`)) {

      toast.success(`"${categoryName}" eliminada (simulación)`);

    }

  };



  const handleNewCategory = () => {

    toast('Próximamente: Formulario de Nueva Categoría');

  };



  return (

    <div className="container-fluid p-4">

      {/* --- Encabezado de la Página --- */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1 className="h2" style={{ fontFamily: "'Playfair Display', serif" }}>

          Administrar Categorías

        </h1>

        <button className="btn btn-primary" onClick={handleNewCategory}>

          <FontAwesomeIcon icon={faPlus} className="me-2" />

          Nueva Categoría

        </button>

      </div>



      {/* --- Tabla de Categorías --- */}

      <div className="card shadow-sm">

        <div className="card-body">

          <table className="table table-hover align-middle">

            <thead className="table-light">

              <tr>

                <th scope="col">Nombre de la Categoría</th>

                <th scope="col">Nº de Productos</th>

                <th scope="col" className="text-end">Acciones</th>

              </tr>

            </thead>

            <tbody>

              {/* 4. Mapeamos la lista de categorías */}

              {categorias.map((categoria) => {

                // Contamos cuántos productos hay en esta categoría

                const productCount = productos.filter(p => p.category === categoria).length;

               

                return (

                  <tr key={categoria}>

                    <td className="fw-bold">{categoria}</td>

                    <td>

                      <span className="badge bg-secondary">{productCount} productos</span>

                    </td>

                   

                    {/* 5. Botones de Acción */}

                    <td className="text-end">

                      <button

                        className="btn btn-sm btn-outline-primary me-2"

                        onClick={() => handleEdit(categoria)}

                      >

                        <FontAwesomeIcon icon={faEdit} /> Editar

                      </button>

                      <button

                        className="btn btn-sm btn-outline-danger"

                        onClick={() => handleDelete(categoria)}

                      >

                        <FontAwesomeIcon icon={faTrash} /> Eliminar

                      </button>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}





export default AdminCategorias;