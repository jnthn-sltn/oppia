// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview A service that maintains a record of which language
 * in the translation tab is currently active.
 */

import { EventEmitter } from '@angular/core';

require('domain/utilities/language-util.service.ts');

angular.module('oppia').factory('TranslationLanguageService', [
  '$log', 'LanguageUtilService',
  function($log, LanguageUtilService) {
    var activeLanguageCode = null;
    var allAudioLanguageCodes = (
      LanguageUtilService.getAllVoiceoverLanguageCodes());
    var _activeLanguageChangedEventEmitter = new EventEmitter();
    return {
      getActiveLanguageCode: function() {
        return activeLanguageCode;
      },
      setActiveLanguageCode: function(newActiveLanguageCode) {
        if (allAudioLanguageCodes.indexOf(newActiveLanguageCode) < 0) {
          $log.error('Invalid active language code: ' + newActiveLanguageCode);
          return;
        }
        activeLanguageCode = newActiveLanguageCode;
        _activeLanguageChangedEventEmitter.emit();
      },
      getActiveLanguageDescription: function() {
        if (!activeLanguageCode) {
          return null;
        }
        return LanguageUtilService.getAudioLanguageDescription(
          activeLanguageCode);
      },
      get onActiveLanguageChanged() {
        return _activeLanguageChangedEventEmitter;
      }
    };
  }]);
