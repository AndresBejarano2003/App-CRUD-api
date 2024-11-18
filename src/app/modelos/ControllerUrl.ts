export const ControllerApiList = {
    Empleado: {
        Guardar: "https://localhost:7106/empleado/Crear",
        Actualizar: "https://localhost:7106/empleado/Actualizar",
        Listar: "https://localhost:7106/empleado/Listado",
        ListarPorId: "https://localhost:7106/empleado/Consulta",
        Eliminar: "https://localhost:7106/empleado/Eliminar",
        ValidarUsuario: "https://localhost:7106/empleado/ValidarUsuario",
        getDataUser: "https://localhost:7106/empleado/GetDataUser",
    },
    Empresa:{
        ActualizarUsuarioEmpresa: "https://localhost:7106/usuarioEmpresa/Actualizar",
        UploadArchivo: "https://localhost:7106/usuarioEmpresa/upload",
    },
    Auditor:{
        ListarInformes: "https://localhost:7106/usuarioAuditor/Listado",
        ListarEmpresas: "https://localhost:7106/usuarioAuditor/ListadoEmpresas",
        ListarPorId: "https://localhost:7106/usuarioAuditor/Consulta",
        Eliminar: "https://localhost:7106/usuarioAuditor/Eliminar",
        ActualizarEmpresa: "https://localhost:7106/usuarioAuditor/ActualizarEmpresa",
        DataInforme: "https://localhost:7106/usuarioAuditor/dataInforme",
        ActualizarInforme: "https://localhost:7106/usuarioAuditor/ActualizarInforme",
        DataUnInforme: "https://localhost:7106/usuarioAuditor/dataUnInforme",
    }
}