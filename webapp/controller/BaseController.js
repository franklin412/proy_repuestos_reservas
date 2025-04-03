sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../service/ServiceHDB"
], function (Controller,service) {
    "use strict";
    var isLocal = true;
    return Controller.extend("zproject.repuestos.controller.BaseController", {
        // onAprobarButtonMain: async function (oEvent) {
        //     getBinding = oEvent.getSource().getBindingContext("localModel");
        //     detalle = false;
        //     this.onAprobarMensajeAdjuntos();
        // },
        onGuardarMaquinas: async function(){
            let oMaquina = {
                
                "createdAt": "2024-01-01T12:00:00Z",
                "createdBy": "PAPA 22",
                "modifiedAt": "2024-01-01T14:00:00Z",
                "modifiedBy": "NO MODIFICADO 22",

                "marca": "Toyota",
                "modelo": "Corolla",
                "anioFabricacion": 2023,
                "color": "Negro",
                "numeroSerie": "123ABC789XYZ",
                "tipoMotor": "Gasolina",
                "capacidadTanque": 50.5
            };
            let getRespuestaCreate = await service.onPostPutGeneral(this.repuestosmodel, "/Maquinas", oMaquina, "POST");
            debugger;
        },
        onGuardarImagen: async function(){
            let getFileUploader = this.localModel.getProperty("/fFileUpload");
            let getBaseUri = sap.ui.component(sap.ui.core.Component.getOwnerIdFor(this.getView()))._oManifest._oBaseUri._parts.path;
            if(getFileUploader){
                let fileName = {
                    "fileName": getFileUploader.name
                };
                let getFileCallSigned = await service.onGetCallsignedUrl(fileName);
                getFileCallSigned = getFileUploader.name +"?"+ getFileCallSigned.split("?")[1];
                await service.onPostAWSFile(getBaseUri,getFileCallSigned,getFileUploader);
                debugger;
            }
            ;
        },
        onFinishUpload: function(oEvent){
            if(oEvent.mParameters.files.length !== 0){
                let getFileU = oEvent.mParameters.files[0];
                this.localModel.setProperty("/fFileUpload", getFileU);
            }
        }
    });
});
