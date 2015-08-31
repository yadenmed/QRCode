angular.module('QRCode.controllers', ['ngCordova'])

.controller('MenuCtrl', function($scope, $ionicModal, $timeout,$rootScope) {
 
})

.controller('LoginCtrl', function($scope) {

})
.controller('CategoriesCtrl', function($scope,$rootScope) {


})
.controller('ClientsCtrl', function($scope) {
 
 $scope.searchKey={text:''};
	$scope.clear = function(){
		$scope.searchKey.text = '';
		
	}
})
.controller('ClientCtrl', function($scope,$ionicModal,$ionicPopup,$rootScope,$stateParams) {

$scope.client = $rootScope.clients[$stateParams.id];
$scope.idClient = $stateParams.id;
$scope.clientEdit = angular.copy($scope.client);
$scope.clientEquipements=[];
$scope.clientInterventions = $rootScope.clients[$stateParams.id].interventions;

 //Acoordion list
$scope.toggleGroup = function(group) {
   if ($scope.isGroupShown(group)) {
     $scope.shownGroup = null;
   } else {
     $scope.shownGroup = group;
   }
 };
 $scope.isGroupShown = function(group) {
   return $scope.shownGroup === group;
 };

for (var i=0; i<$scope.client.equipements.length; i++) 
        $scope.clientEquipements.push($rootScope.products[$scope.client.equipements[i]]);
        

$ionicModal.fromTemplateUrl('templates/client-edit.html', function($ionicModal) {
        $scope.modalEdit = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up',
        focusFirstInput : true
    });

$ionicModal.fromTemplateUrl('templates/client-interventions.html', function($ionicModal) {
        $scope.modalInterventions = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up',
        focusFirstInput : true
    });

$ionicModal.fromTemplateUrl('templates/menu-choice.html', function($ionicModal) {
        $scope.modalMenuChoice = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up',
        focusFirstInput : true
    });
    $scope.showModalMenuChoice = function(id){
      $rootScope.currentEquipement = $scope.clientEquipements[id];
      $rootScope.urlId = $scope.client.equipements[id];
      $scope.modalMenuChoice.show();
    }   
   
   $scope.save = function(){
   	$scope.client = $scope.clientEdit;
   	$scope.modalEdit.hide();
   	$ionicPopup.alert({
                title: '<strong>Modification réussie</strong>',
                template: "<center>Les informations du client <strong>"+$scope.client.nom+"</strong> ont été mises à jour</center>",
                okType: 'button-stable'
              });

   }

})
.controller('ProductsCtrl', function($scope,$rootScope,$ionicModal,$state,$timeout) {


	$scope.searchKey={text:''};
  $scope.clear = function(){
    $scope.searchKey.text = '';
    
  }


  $ionicModal.fromTemplateUrl('templates/menu-choice.html', function($ionicModal) {
          $scope.modalMenuChoice = $ionicModal;
      }, {
          // Use our scope for the scope of the modal to keep it simple
          scope: $scope,
          // The animation we want to use for the modal entrance
          animation: 'slide-in-up',
          focusFirstInput : true
      });
      $scope.showModalMenuChoice = function(id){
        $rootScope.currentEquipement  = angular.copy($rootScope.products[id]);
        $rootScope.urlId = id;
        $scope.modalMenuChoice.show();
        
      }   

})
.controller('TheorieFormation',function($scope,$rootScope,$stateParams,$ionicScrollDelegate){
 
 $scope.id=$stateParams.id;
 
 $scope.caracteristiques = $rootScope.products[$scope.id].caracteristiques;
 $scope.performances = $rootScope.products[$scope.id].performances;

 $scope.scrollTop = function() {
    $ionicScrollDelegate.scrollTop();
  };

 //Accordion list
 $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

})
.controller('InstallationMiseEnService',function($scope,$rootScope,$stateParams){
  $scope.id=$stateParams.id;
  $scope.quickInstallation=$rootScope.products[$scope.id]["quick installation"];
  $scope.steps = $scope.quickInstallation.steps;
})
.controller('AideDiagnostic',function($scope,$rootScope,$stateParams,$ionicPopup,$ionicModal){
  $scope.id=$stateParams.id;

  $scope.dysfonctionnements = $rootScope.products[$scope.id].dysfonctionnements;
  $scope.erreurs = $rootScope.products[$scope.id].erreurs;

//Dysfonctionnements

  //Acoordion list
 $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

  //Solution Popup
  $scope.diags='';
  $scope.solutionPopup = function(diags){
    $scope.diags=angular.copy(diags);
    $ionicPopup.show({
        template: '<div class="list wrapping-list"><ion-item class="item item-icon-left" ng-repeat = "diag in diags"><i class="icon ion-android-done"></i>{{diag}}</ion-item></div>',
        title: '<b>Solution</b>',
        scope: $scope,
        buttons: [
          
          {
            text: 'OK',
            type: 'button-stable',
            onTap: function(e) {
             this.close();
            }
          }
        ]
      });
    
  }
  $scope.query={text:''};
   $scope.search = function (item){
       if (angular.lowercase(item.id).indexOf(angular.lowercase($scope.query.text))!=-1 || angular.lowercase(item.title).indexOf(angular.lowercase($scope.query.text))!=-1) {
               return true;
           }
           return false;
     };
     //Assistant d'erreurs 
       $ionicModal.fromTemplateUrl('templates/modal-assistant-erreurs.html', function($ionicModal) {
               $scope.modalAssistantErreurs = $ionicModal;
           }, {
               // Use our scope for the scope of the modal to keep it simple
               scope: $scope,
               // The animation we want to use for the modal entrance
               animation: 'slide-in-up',
               focusFirstInput : true
           });

       $scope.showModalAssistantErreurs = function(numErr){

        $rootScope.currentErreur = angular.copy($scope.erreurs[numErr]);
        $scope.currentErrorTitle = angular.copy($rootScope.currentErreur.title);

        $scope.modalAssistantErreurs.show();

       }
  
})
.controller('AssistantErreurs',function($scope,$rootScope,$stateParams){

  $scope.yes=function(){
    if($rootScope.currentErreur.yes)
      $rootScope.currentErreur = $rootScope.currentErreur.yes;
  }

  $scope.no = function(){
    if($rootScope.currentErreur.no)
      $rootScope.currentErreur = $rootScope.currentErreur.no;
  }


})
.controller('PiecesAccessoires',function($scope,$rootScope,$stateParams,$ionicModal,$ionicScrollDelegate,$location){
  
  
  $scope.id=$stateParams.id;
  $scope.pieces=$rootScope.products[$scope.id]["pieces"];
  $ionicModal.fromTemplateUrl('templates/modal-vue-eclatee.html', function($ionicModal) {
          $scope.modalVueEclatee = $ionicModal;
      }, {
          // Use our scope for the scope of the modal to keep it simple
          scope: $scope,
          // The animation we want to use for the modal entrance
          animation: 'slide-in-up',
          focusFirstInput : true
      });
   
   $scope.searchKey={ text : ''};
   $scope.clear = function(){
    $scope.searchKey.text = '';
    
   }

   $scope.scrollTo = function(id) {
    $location.hash(id);
    $ionicScrollDelegate.anchorScroll();
};
  
})
.controller('CarnetEntretien',function($scope,$rootScope,$stateParams){
 
  $scope.id=$stateParams.id;
 
  
})
.controller('Utilisation',function($scope,$rootScope,$stateParams){
  $scope.id=$stateParams.id;
  $scope.quickStart=$rootScope.products[$scope.id]["quick start"];
})
.controller('ContactServices',function($scope,$rootScope,$stateParams){
  $scope.id=$stateParams.id;
  $scope.contactSAV=$rootScope.products[$scope.id]["contact sav"];

})
;
