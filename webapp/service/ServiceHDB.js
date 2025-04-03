sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (JSONModel, Filter, FilterOperator) {
	"use strict";
	var oManifestObject;
	return {
		setManifestObject: function (that) {
			oManifestObject = that.getOwnerComponent().getManifestObject();
		},
        onConsultaDatosBD: function (oModel, entity, aFilter) {
            return new Promise(function (resolve, reject) {
                oModel.read(entity,{
                    async: true,
                    success: function (oResponse) {	
						resolve(oResponse);
					},
					error: function (oErr) {
						reject(oErr);
					}
                });
            });    
        },
		onPostPutGeneral: function (oModel, entity, oData, sMethod) {
			return new Promise(function (resolve, reject) {
				if (sMethod === "POST") {
					oModel.create(entity, oData, {
						success: function (oResponse) {
							resolve(oResponse);
						},
						error: function (oErr) {
							reject(oErr);
						}
					});
				} else if (sMethod === "PUT") {
					var sPath = entity + "(ID='" + oData.ID + "')";
					oModel.update(sPath, oData, {
						success: function (oResponse) {
							resolve(oResponse);
						},
						error: function (oErr) {
							reject(oErr);
						}
					});
				}
			});
		},
		onGetCallsignedUrl: function (oData, entity, aFilter) {
            return new Promise(function (resolve, reject) {
                $.ajax({
					url: "https://mzxlq5bxw1.execute-api.us-east-1.amazonaws.com/dev",  // URL de tu API Gateway
					type: "POST",  // Método HTTP
					contentType: "application/json",
					data: JSON.stringify(oData), // Enviar datos en formato JSON
					success: function(response) {
						var signedUrl = JSON.parse(response.body).signedUrl; // Extraer la URL firmada
						console.log("URL firmada:", signedUrl);
						resolve(signedUrl);
					},
					error: function(xhr, status, error) {
						console.error("Error en la solicitud:", error);
						reject(error);
					}
				});
            });    
        },
		onPostAWSFile: function (BaseUri,signedUrl, sfile, aFilter) {
            return new Promise(function (resolve, reject) {
				$.ajax({
					url: BaseUri+"AWSS3local/"+signedUrl,  // URL firmada obtenida del API Gateway
					type: "PUT",  // Método PUT para subir el archivo
					contentType: sfile.type, // Tipo de contenido del archivo
					processData: false, // No procesar los datos
					data: sfile,  // Archivo que se enviará
	  
					success: function(response) {
						console.log("Archivo subido exitosamente", response);
						resolve(response);
					},
					error: function(xhr, status, error) {
						console.error("Error al subir el archivo:", error);
						reject(error);
					}
				});
            });    
        }

    };
});
