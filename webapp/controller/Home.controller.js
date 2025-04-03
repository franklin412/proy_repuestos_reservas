sap.ui.define([
    "./BaseController",
    "sap/ui/core/mvc/Controller",
    "../service/ServiceHDB",
	"../lib/underscore3"
],
function (BaseController,Controller,service,underscore3) {
    "use strict";
    var canvas;
	var oThat;
    var local = true;
	const deleteIcon ="data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
    return BaseController.extend("zproject.repuestos.controller.Home", {
        onInit: function () {

			//	this.byId("idHTMLContent").setContent("<canvas id='canvas' name='canvas' width='400' height='300' style='border:1px solid #ccc'></canvas>");
			// this.byId("idHTMLContent2").setContent("<button id='add' onclick='Add()'>Add a rectangle</button>"); 

		},
		onAfterRendering: async function () {

			oThat = this;

			this.localModel = this.getView().getModel("localModel");
			canvas = new fabric.Canvas('idSignature');
			// this.localModel.setProperty("/arrcanvas", canvas);

			canvas.setBackgroundImage('../util/img/Camion.png', canvas.renderAll.bind(canvas));
			// Obtener la ruta correcta de la imagen en SAP UI5
			local ?  this.repuestosmodel = this.getView().getModel("repuestosmodelLocal") :  this.repuestosmodel = this.getView().getModel("repuestosmodel");;
            let oUsuarioFilter = await service.onConsultaDatosBD(this.repuestosmodel, "/Maquinas", []);
            // let segundaconsulta = await service.onConsultaDatosBD(this.repuestosmodel, "/READSET", []);
            let test = 1;

		},

		rectangulo: function () {
			// var deleteIcon = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";
			
			function Add() {
				var rect = new fabric.Rect({
					left: 100,
					top: 50,
					fill: '#232055',
					width: 40,
					height: 40,
					objectCaching: false,
					stroke: 'blue',
					strokeWidth: 2,

					// 🔒 Bloquear transformación
					lockScalingX: true,  // No permitir escalar en X
					lockScalingY: true,  // No permitir escalar en Y
					lockRotation: true,   // No permitir rotar
					
					// ❌ Ocultar controles estándar
					hasBorders: false, 
					hasControls: true, // Para permitir el botón de eliminar
				});

				oThat.onClearControl(rect);

				canvas.add(rect);
				canvas.setActiveObject(rect);
			}
			Add();
			this.onRenderIconDelete();
			
		},
		onRenderIconDelete: function(){
			var img = document.createElement('img');
			img.src = deleteIcon;
			fabric.Object.prototype.controls.deleteControl = new fabric.Control({
				position: { x: 0.5, y: -0.5 },
				offsetY: 16,
				cursorStyle: 'pointer',
				mouseUpHandler: deleteObject,
				render: renderIcon,
				cornerSize: 24
			  });


			function deleteObject(eventData, target) {
				var canvas = target.canvas;
				canvas.remove(target);
				canvas.requestRenderAll();
			}
		
			
			function renderIcon(ctx, left, top, styleOverride, fabricObject) {
				var size = this.cornerSize;
				ctx.save();
				ctx.translate(left, top);
				ctx.drawImage(img, -size/2, -size/2, size, size);
				ctx.restore();
			}
		},
		triangulo: function () {
			var that = this;


			function Add() {
				var triangle = new fabric.Triangle({
					top: 300,
					left: 210,
					width: 50,
					height: 50,
					fill: 'green',
					// 🔒 Bloquear transformación
					lockScalingX: true,  // No permitir escalar en X
					lockScalingY: true,  // No permitir escalar en Y
					lockRotation: true,   // No permitir rotar
					
					// ❌ Ocultar controles estándar
					hasBorders: false, 
					hasControls: true, // Para permitir el botón de eliminar
				});

				oThat.onClearControl(triangle);

				canvas.add(triangle);
				canvas.setActiveObject(triangle);
				// that.localModel.setProperty("/arrcanvas", canvas);
			}

			Add();

			function renderIcon(ctx, left, top, styleOverride, fabricObject) {
				var size = this.cornerSize;
				ctx.save();
				ctx.translate(left, top);
				ctx.drawImage(img, -size / 2, -size / 2, size, size);
				ctx.restore();
			}

		},
		circulo: function () {



			function Add() {
				var circle = new fabric.Circle({
					top: 140,
					left: 230,
					radius: 25,
					fill: 'red',
					// 🔒 Bloquear transformación
					lockScalingX: true,  // No permitir escalar en X
					lockScalingY: true,  // No permitir escalar en Y
					lockRotation: true,   // No permitir rotar
					
					// ❌ Ocultar controles estándar
					hasBorders: false, 
					hasControls: true, // Para permitir el botón de eliminar
				});

				oThat.onClearControl(circle);
				

				canvas.add(circle);
				canvas.setActiveObject(circle);
				// that.localModel.setProperty("/arrcanvas", canvas);
			}

			Add();

			function renderIcon(ctx, left, top, styleOverride, fabricObject) {
				var size = this.cornerSize;
				ctx.save();
				ctx.translate(left, top);
				ctx.drawImage(img, -size / 2, -size / 2, size, size);
				ctx.restore();
			}

		},
		onClearControl: function(form){
			// 👉 Ocultar todos los controles excepto deleteControl
			form.setControlsVisibility({
				mt: false, // Top middle
				mb: false, // Bottom middle
				ml: false, // Middle left
				mr: false, // Middle right
				tl: false, // Top left
				tr: false, // Top right
				bl: false, // Bottom left
				br: false, // Bottom right
				mtr: false // Rotation control
			});
		},
		onPrepararFirma: function () {
			var canvas = document.getElementById("idSignature"),
				ctx = canvas.getContext("2d");

			this.onChangeImageFirma(ctx);

		},
		onChangeImageFirma: function (ctx) {
			var background = new Image();
			background.src = "./util/img/Camion.png";
			background.onload = function () {
				ctx.drawImage(background, 0, 0);
			};
		},
		onCapturePhoto: function () {
			let getbase64 = canvas.toDataURL({ format: "png" });
			// this.onPrepararFirma();
		},
		onClearLienzo: function () {
			var fondo = canvas.backgroundImage; // Guardar fondo
		
			canvas.clear(); // Borrar todo
			canvas.backgroundImage = fondo; // Restaurar fondo
			canvas.requestRenderAll();
		}

    });
});
