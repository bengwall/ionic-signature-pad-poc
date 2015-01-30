"user strict"

// https://github.com/coolaj86/ngSignaturePad with a few modifications
angular.module("app").directive('signaturePad', function ($window) {
	"use strict";

	var signaturePad, canvas, scope, element, EMPTY_IMAGE = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

	function calculateHeight($element) {
		return parseInt($element.css("height"), 10) - 70;
	}

	function calculateWidth($element) {
		return parseInt($element.css("width"), 10) - 25;
	}

	function setCanvasHeightAndWidth() {
		var height = calculateHeight(element), width = calculateWidth(element);

		scope.signatureWidth = width;
		scope.signatureHeight = height;
		canvas.attr("height", height);
		canvas.attr("width", width);
	}

	$window.addEventListener("resize", function () {
		scope.$apply(function () {
			var img = signaturePad.toDataURL();
			setCanvasHeightAndWidth();
			signaturePad.fromDataURL(img);
		});
	}, false);

	$window.addEventListener("orientationchange", function () {
		scope.$apply(function () {
			var img = signaturePad.toDataURL();
			setCanvasHeightAndWidth();
			signaturePad.fromDataURL(img);
		});
	}, false);


	return {
		restrict: 'A',
		replace: true,
		template: '<div class="signature-background">' +
					'<div class="signature" ng-style="{height: signatureHeight, width: signatureWidth}" >' +
						'<canvas></canvas>' +
					'</div>' +
					'<div class="action">' +
						'<button class="button button-energized" ng-click="clear()">Clear</button>' +
						'<button style="float:right" class="button button-balanced icon-right ion-chevron-right" ng-click="accept()">Save and Continue</button>' +
					'</div>' +
				'</div>',
		scope: {
			signature: "=signature",
			close: "&"
		},
		controller: function ($scope) {
			$scope.accept = function () {
				if (!signaturePad.isEmpty()) {
					$scope.signature.dataUrl = signaturePad.toDataURL();
					$scope.signature.$isEmpty = false;
					$scope.signature.signaturePad = signaturePad;
				} else {
					$scope.signature.dataUrl = EMPTY_IMAGE;
					$scope.signature.$isEmpty = true;
					$scope.signature.signaturePad = signaturePad;
				}
				$scope.close();
			};

			$scope.clear = function () {
				signaturePad.clear();
				setCanvasHeightAndWidth();
			};
		},
		link: function ($scope, $element) {
			canvas = $element.find("canvas");
			scope = $scope;
			element = $element;
			signaturePad = new SignaturePad(canvas[0]);

			setCanvasHeightAndWidth();

			$scope.signature.clear = function(){
				$scope.clear()
			};
			$scope.signature.isEmpty = function(){
				return signaturePad.isEmpty()
			};

			if ($scope.signature && !$scope.signature.$isEmpty && $scope.signature.dataUrl) {
				signaturePad.fromDataURL($scope.signature.dataUrl);
			}
		}
	};
});